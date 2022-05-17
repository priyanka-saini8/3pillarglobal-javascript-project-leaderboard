let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let country = document.getElementById('country');
let score = document.getElementById('score');
let message = document.getElementById('message');

let leaderLocal = new Array;

const savedList = JSON.parse(localStorage.getItem('leaderLocal'));

if (Array.isArray(savedList)) {
    leaderLocal = savedList;
    printArray();
}

function validateInput() {
    if ((fname.value == "") || (lname.value == "") || country.value == "" || score.value == "") {
        message.innerHTML = "All fields are required";
    } else{
        createObj();}
}

function createObj() {
    let fname = document.getElementById('fname');
    let lname = document.getElementById('lname');
    let country = document.getElementById('country');
    let score = document.getElementById('score');
    let message = document.getElementById('message');
    const id = '' + new Date().getTime();
    let fulltime = new Date().toString();
    const obj = {
        id: id,
        fname: fname.value,
        lname: lname.value,
        country: country.value,
        score: parseInt(score.value),
        time: fulltime.substring(16,21),
        date: fulltime.substring(4, 15)
    }
    leaderLocal.push(obj);
    createSortedArray(leaderLocal);
    printArray();
}
function createSortedArray(leaderLocal) {
    for(var i = 1; i < leaderLocal.length; i++) {
        var j = i; 
        while(j > 0 && leaderLocal[j].score > leaderLocal[j-1].score) {
            var temp = leaderLocal[j];
            leaderLocal[j] = leaderLocal[j-1];
            leaderLocal[j-1] = temp;
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

       let firstDiv = document.createElement('div');
       firstDiv.classList.add("name-container");
       newDiv.appendChild(firstDiv);

       let nameDiv = document.createElement('div');
       firstDiv.appendChild(nameDiv);
       nameDiv.classList.add("nameDiv");

       let dateDiv = document.createElement('div');
       firstDiv.appendChild(dateDiv);
       dateDiv.classList.add("dateDiv");

       let countryDiv = document.createElement('div');
       countryDiv.classList.add("country-container");
       newDiv.appendChild(countryDiv);

       let scoreDiv = document.createElement('div');
       scoreDiv.classList.add("score-container");
       newDiv.appendChild(scoreDiv);

       let operationDiv = document.createElement('div');
       operationDiv.classList.add("operation-container");
       newDiv.appendChild(operationDiv);

       nameDiv.innerHTML = leaderLocal[i].fname.toUpperCase()+' '+leaderLocal[i].lname.toUpperCase();
       dateDiv.innerHTML = leaderLocal[i].date.toUpperCase()+' '+leaderLocal[i].time;
       countryDiv.innerHTML = leaderLocal[i].country.toUpperCase();
       scoreDiv.innerHTML = leaderLocal[i].score;

       let deleteButton = document.createElement('button');
       let increaseButton = document.createElement('button');
       let decreaseButton = document.createElement('button');

       deleteButton.innerHTML = "<img src='\image\\delete-icon.png' class='delete-icon'>";
       increaseButton.innerHTML ='+5';
       decreaseButton.innerHTML = '-5';

       deleteButton.setAttribute("onclick", `deleteObj(${leaderLocal[i].id})`);
       increaseButton.setAttribute("onclick", `increaseScore(${leaderLocal[i].id})`);
       decreaseButton.setAttribute("onclick", `decreaseScore(${leaderLocal[i].id})`);

       deleteButton.classList.add('buttons');
       increaseButton.classList.add('buttons');
       decreaseButton.classList.add('buttons');
       operationDiv.appendChild(deleteButton);
       operationDiv.appendChild(increaseButton);
       operationDiv.appendChild(decreaseButton);


    }
    saveToStorage();
}

function deleteObj(id) {
    for(var i=0; i < leaderLocal.length;i++) {
        if(id == leaderLocal[i].id) {
            for(var j = i; j < leaderLocal.length-1; j++) {
                leaderLocal[j] =  leaderLocal[j+1];
            }
        }
    }
    leaderLocal.pop();
    printArray();
}

function increaseScore(id) {
    for(var i = 0; i < leaderLocal.length; i++) {
        if(id == leaderLocal[i].id) {
            leaderLocal[i].score += 5;
        }
    }
    createSortedArray(leaderLocal);
    printArray();
}

function decreaseScore(id) {
    for(var i = 0; i < leaderLocal.length; i++) {
        if(id == leaderLocal[i].id) {
            leaderLocal[i].score -= 5;
        }
    }
    createSortedArray(leaderLocal);
    printArray();
}

function saveToStorage() {
    localStorage.setItem('leaderLocal', JSON.stringify(leaderLocal));
}