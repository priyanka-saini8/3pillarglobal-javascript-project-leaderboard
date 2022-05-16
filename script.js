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
        score: parseInt(score.value),
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString()
    }
    leaderLocal.push(obj);
    console.log(obj);
    createSortedArray(leaderLocal);
    printArray();
}
function createSortedArray(leaderLocal) {
    for(var i = 1; i < leaderLocal.length; i++) {
        var j = i; 
        while(j > 0 && leaderLocal[j].score > leaderLocal[j-1].score) {
            var temp = leaderLocal[j];
            leaderLocal[j] = leaderLocal[j-1];
            leaderLocal[j-1] = temp
            j--;
        }
    }
}
function printArray() {
    let listDiv = document.getElementById('listboard');
    listDiv.innerHTML = '';
    for(var i = 0; i < leaderLocal.length; i++) {
       const newDiv = document.createElement('div');
       newDiv.classList.add("info-container");
       listDiv.appendChild(newDiv);

       let nameDiv = document.createElement('div');
       nameDiv.classList.add("name-container");
       newDiv.appendChild(nameDiv);

       let countryDiv = document.createElement('div');
       countryDiv.classList.add("country-container");
       newDiv.appendChild(countryDiv);

       let scoreDiv = document.createElement('div');
       scoreDiv.classList.add("score-container");
       newDiv.appendChild(scoreDiv);

       let operationDiv = document.createElement('div');
       operationDiv.classList.add("operation-container");
       newDiv.appendChild(operationDiv);

       nameDiv.innerHTML = leaderLocal[i].fname+leaderLocal[i].lname;
       countryDiv.innerHTML = leaderLocal[i].country;
       scoreDiv.innerHTML = leaderLocal[i].score;
    }
}