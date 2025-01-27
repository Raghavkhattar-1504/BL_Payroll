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

