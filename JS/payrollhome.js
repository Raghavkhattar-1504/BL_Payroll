const userdata = JSON.parse(localStorage.getItem('userData'));
console.log("userDara", userdata)

$(document).ready(() => {

    if (userdata) {
        userdata.forEach((user, ind) => {
            const dept = user.dpt
                .map((dept) => `<span>${(dept)}</span>`).join(", ");

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
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                                    fill="currentColor">
                                    <path d="M3 6h18v2H3V6zm3 14h12V9H6v11zm3-7h6v2H9v-2z" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"
                                    fill="currentColor">
                                    <path
                                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13l-2.5-2.5 2.5-2.5-1.41-1.41L12 11.59l-3.59-3.59L7 8.5l2.5 2.5-2.5 2.5L8.41 16l3.59-3.59L15.59 16z" />
                                </svg>
                            </td>
                        </tr>`

            $(".emp-bdy-tbl-tbody").append(row);
        });
    }
});