const userdata = JSON.parse(localStorage.getItem('userData'));
console.log("userDara", userdata)

$(document).ready(() => {

    $.ajax({
        url: 'http://localhost:3000/emplist',
        type: 'GET',
        success: function (userdata) {
            if (userdata) {
                userdata.forEach((user, ind) => {
                    const dept = user.dpt
                        .map((dept) => `<span class= "badge">${(dept)}</span>`).join("").slice(" ");

                    let datestr = ''

                    console.log(user.startdate)

                    if (user.startdate.date === "1" && user.startdate.month === '1' && user.startdate.year === '1') {
                        datestr = `01 January 1965`;
                    }
                    else if (user.startdate.date === "2" && user.startdate.month === '2' && user.startdate.year === '2') {
                        datestr = `11 May 1986`;
                    }
                    else if (user.startdate.date === "3" && user.startdate.month === '3' && user.startdate.year === '3') {
                        datestr = `21 October 2006`;
                    }

                    const userId = user.id;
                    
                    const row = `
                    <tr>
                                    <td><img src= ${user.pi} alt="Avatar"> ${user.name}</td>
                                    <td>${user.gen}</td>
                                    <td>
                                        ${dept}
                                    </td>
                                    <td>${user.sal}</td>
                                    <td>${datestr}</td>
                                    <td class="actions">
                                        <img onclick= "editUser('${userId}')" src="../Assets/pencil.png" alt="Edit" class="edit-logo">
                                        </img>
                                        <img onclick= "deleteUser('${userId}')" src="../Assets/bin.png" alt="Delete" class="delete-logo">
                                        </img>
                                    </td>
                                </tr>`

                    $(".emp-bdy-tbl-tbody").append(row);
                });
            }
        }
    })

});

function deleteUser(index) {
    console.log(index);
    
    $.ajax({
        url : `http://localhost:3000/emplist/${index}`,
        method : 'DELETE' , 
        success : function (res) {
            console.log('Employee deleted successfully: ', res);
        },
        error: function (error) {
            console.log(`Error occured : ${error}`);
        },
     })
}


function editUser(index) {
    // console.log("in");
    
$.ajax({
    url : `http://localhost:3000/emplist/${index}`,
    method: 'GET',
    success : (function (res) {
        localStorage.setItem('userData' , JSON.stringify(res));
        window.location.href = "payrollform.html"
    })
    
})
}

function searchByName() {
    let input = $("#search-input").val().toLowerCase();

    $.ajax({
        url: 'http://localhost:3000/emplist',
        type: 'GET',
        success: function (userdata) {
            if (userdata) {
                // Filter users based on search input
                let filteredUsers = userdata.filter(user => user.name.toLowerCase().includes(input));

                console.log("Filtered Users:", filteredUsers);

                // Clear previous table data
                $(".emp-bdy-tbl-tbody").empty();

                if (filteredUsers.length > 0) {
                    filteredUsers.forEach(user => {
                        const dept = user.dpt
                            .map(dept => `<span class="badge">${dept}</span>`)
                            .join(""); 

                        // Convert startdate values to numbers
                        let startDate = user.startdate;
                        let datestr = "Unknown Date"; 

                        if (+startDate.date === 1 && +startDate.month === 1 && +startDate.year === 1) {
                            datestr = `01 January 1965`;
                        } else if (+startDate.date === 2 && +startDate.month === 2 && +startDate.year === 2) {
                            datestr = `11 May 1986`;
                        } else if (+startDate.date === 3 && +startDate.month === 3 && +startDate.year === 3) {
                            datestr = `21 October 2006`;
                        }

                        const userId = user.id;
                        const profilePic = user.pi || '../Assets/default-avatar.png';

                        const row = `
                        <tr>
                            <td><img src="${profilePic}" alt="Avatar"> ${user.name}</td>
                            <td>${user.gen}</td>
                            <td>${dept}</td>
                            <td>${user.sal}</td>
                            <td>${datestr}</td>
                            <td class="actions">
                                <img onclick="editUser('${userId}')" src="../Assets/pencil.png" alt="Edit" class="edit-logo">
                                <img onclick="deleteUser('${userId}')" src="../Assets/bin.png" alt="Delete" class="delete-logo">
                            </td>
                        </tr>`;

                        $(".emp-bdy-tbl-tbody").append(row);
                    });
                } else {
                    $(".emp-bdy-tbl-tbody").append(`<tr><td colspan="6">No users found</td></tr>`);
                }
            }
        },
        error: function (error) {
            console.log(`Error occurred:`, error);
        }
    });

}

