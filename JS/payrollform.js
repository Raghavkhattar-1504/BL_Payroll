const form = document.querySelector("form");
console.log("iinside js")
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

    if(localStorage.getItem('userData')){
        const data = JSON.parse(localStorage.getItem('userData'))
        data.push(obj)
        localStorage.setItem('userData',JSON.stringify(data));
    }else{
        localStorage.setItem("userData",JSON.stringify([obj]))
    }
    
    alert('Employee added successfullly!')
    window.location.href = 'payrollhome.html'
})