let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let country = document.getElementById('country');
let score = document.getElementById('score');
let message = document.getElementById('message');

let leaderLocal = new Array;

const savedList = JSON.parse(localStorage.getItem('leaderLocal'));

if (Array.isArray(savedList)) {
    leaderLocal = savedList;
}

function validateInput() {
    if ((fname.value == "") || (lname.value == "") || country.value == "" || score.value == "") {
        message.innerHTML = "All Fields are required";
        return 1;
    } else {
        message.innerHTML = "Item Added";
        createObj();
    }
}
function createObj() {
    let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let country = document.getElementById('country');
let score = document.getElementById('score');
let message = document.getElementById('message');
    const id = '' + new Date().getTime();
    console.log(id);
    const obj = {
        fname: fname.value,
        lname: lname.value,
        country: country.value,
        score: score.value,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
    }
    leaderLocal.push(obj);
    console.log(obj);
}