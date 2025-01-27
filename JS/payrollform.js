const form = document.querySelector("form");
// console.log("iinside js")

document.addEventListener("DOMContentLoaded", function () {
    const fetchData = JSON.parse(localStorage.getItem("userData"));
    if (fetchData) {
        document.querySelector('#namebox').value = fetchData.name;
        document.querySelector('#notes').value = fetchData.notes;
        document.querySelector(`input[name='profile-image'][value='${fetchData.pi}']`).checked = true; 
        document.querySelector(`input[name='genbox'][value = '${fetchData.gen}']`).checked = true;
        fetchData.dpt.forEach(element => {
            document.querySelector(`input[name='dpt'][value = '${element}']`).checked = true;
        });
        document.querySelector('#salary').value = fetchData.sal;
        document.querySelector('#date').value = fetchData.startdate.date;
        document.querySelector('#month').value = fetchData.startdate.month;
        document.querySelector('#year').value = fetchData.startdate.year;
    }
    else{
        // alert("No employee found!");
    }
})

form.addEventListener("submit" , function (e) {
    
    


    e.preventDefault()
    const name = document.querySelector("#namebox").value;
    const notes = document.querySelector("#notes").value;
    const pi = document.querySelector("input[name='profile-image']:checked").value;
    const gen = document.querySelector("input[name='genbox']:checked").value;
    const dpt = Array.from(document.querySelectorAll("input[name='dpt']:checked")).map(item => item.value);
    const sal = document.querySelector("#salary").value;
    const date = document.querySelector("#date").value;
    const month = document.querySelector("#month").value;
    const year = document.querySelector("#year").value;

    const obj = {
        name ,
        pi,
        gen,
        dpt,
        sal,
        startdate : {
            date,
            month,
            year
        },
        notes
    }

    console.log("userdata",obj)
    const dataChk = JSON.parse(localStorage.getItem('userData'));
    if(!dataChk){
    fetch('http://localhost:3000/emplist', {
        method : 'POST',
        headers : {
            'Content-type' : 'application/json',
        },
        body : JSON.stringify(obj), 
    })
    .then((res) => {
        if(!res.ok){
            throw new Error(`${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        console.log('Success', data);
    })
    .catch((error) => {
        console.log('Error' , error);
    })}

    else{


        fetch(`http://localhost:3000/emplist/${dataChk.id}` , {
            method : 'PUT',
            body :    JSON.stringify(obj)
        })
        .then(() => console.log("Employee data updated."))
        .catch((err) => console.log(`Error : ${err}`))

        localStorage.removeItem('userData');

    }



    window.location.href = 'payrollhome.html'
})