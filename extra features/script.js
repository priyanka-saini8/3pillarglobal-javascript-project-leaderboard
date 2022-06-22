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

printArray();

function validateInput() {
    if ((fname.value == "") || (lname.value == "") || country.value == "" || score.value == "") 
        message.innerHTML = "All fields are required";
    else if (fname.value.length > 15 || lname.value.length > 15 || country.value.length > 15) 
        message.innerHTML = "Value is too long. Enter smaller value";
    else {
        message.innerHTML = '';
        createObj();
    }
}

function createObj() {
    const id = '' + new Date().getTime();
    let fulltime = new Date().toString();

    const obj = {
        id: id,
        fname: fname.value,
        lname: lname.value,
        country: country.value,
        score: parseInt(score.value),
        time: fulltime.substring(16, 21),
        date: fulltime.substring(4, 15),
        variationScore: [parseInt(score.value)],
        variationTime: [`${fulltime.substring(4, 15)} ${fulltime.substring(16, 24)}`]
    };

    leaderLocal.push(obj);
    createSortedArray(leaderLocal);

}

function createSortedArray(leaderLocal) {
    for (let i = 1; i < leaderLocal.length; i++) {
        let j = i;
        while (j > 0 && leaderLocal[j].score > leaderLocal[j - 1].score) {
            var temp = leaderLocal[j];
            leaderLocal[j] = leaderLocal[j - 1];
            leaderLocal[j - 1] = temp;
            j--;
        }
    }
    printArray();
}

function printArray() {
    let listDiv = document.getElementById('listboard');

    if (leaderLocal.length <= 0) listDiv.innerHTML = 'No player is added yet<br> Kindly add a player first';
    else listDiv.innerHTML = '';

    for (var i = 0; i < leaderLocal.length; i++) {
        const newDiv = document.createElement('div');
        newDiv.setAttribute("onclick", `showGraph(${i})`);
        newDiv.classList.add("info-container");
        listDiv.appendChild(newDiv);

        let graphDiv = document.createElement('div');
        graphDiv.setAttribute("id", `graph${i}`);
        listDiv.appendChild(graphDiv);

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

        nameDiv.innerHTML = leaderLocal[i].fname.toUpperCase() + ' ' + leaderLocal[i].lname.toUpperCase();
        dateDiv.innerHTML = leaderLocal[i].date.toUpperCase() + ' ' + leaderLocal[i].time;
        countryDiv.innerHTML = leaderLocal[i].country.toUpperCase();
        scoreDiv.innerHTML = leaderLocal[i].score;

        let deleteButton = document.createElement('button');
        let increaseButton = document.createElement('button');
        let decreaseButton = document.createElement('button');

        deleteButton.innerHTML = "<img src='\image\\delete-icon.png' class='delete-icon'>";
        increaseButton.innerHTML = '+5';
        decreaseButton.innerHTML = '-5';

        deleteButton.setAttribute("onclick", `deleteObj(${leaderLocal[i].id}, event)`);
        increaseButton.setAttribute("onclick", `increaseScore(${leaderLocal[i].id}, event)`);
        decreaseButton.setAttribute("onclick", `decreaseScore(${leaderLocal[i].id}, event)`);

        deleteButton.classList.add('buttons');
        increaseButton.classList.add('buttons');
        decreaseButton.classList.add('buttons');

        operationDiv.appendChild(deleteButton);
        operationDiv.appendChild(increaseButton);
        operationDiv.appendChild(decreaseButton);
    }
    saveToStorage();
}

function deleteObj(id, event) {
    for (var i = 0; i < leaderLocal.length; i++) {
        if (id == leaderLocal[i].id) leaderLocal.splice(i, 1);
    }
    createSortedArray(leaderLocal);
    event.stopPropagation();
}

function increaseScore(id, event) {
    let fulltime = new Date().toString();

    for (var i = 0; i < leaderLocal.length; i++) {
        if (id == leaderLocal[i].id) {
            leaderLocal[i].score += 5;
            leaderLocal[i].variationScore.push(leaderLocal[i].score);
            leaderLocal[i].variationTime.push(`${fulltime.substring(4, 15)} ${fulltime.substring(16, 24)}`)
        }
    }
    createSortedArray(leaderLocal);
    event.stopPropagation();
}

function decreaseScore(id, event) {
    let fulltime = new Date().toString();

    for (var i = 0; i < leaderLocal.length; i++) {
        if (id == leaderLocal[i].id) {
            leaderLocal[i].score -= 5;
            leaderLocal[i].variationScore.push(leaderLocal[i].score);
            leaderLocal[i].variationTime.push(`${fulltime.substring(4, 15)} ${fulltime.substring(16, 24)}`)
        }
    }
    createSortedArray(leaderLocal);
    event.stopPropagation();
}

function saveToStorage() {
    localStorage.setItem('leaderLocal', JSON.stringify(leaderLocal));
}

function showGraph(index) {
    let graphDiv = document.getElementById(`graph${index}`);

    let infoContainers = document.querySelectorAll(".info-container");
    let clickedContainer = infoContainers[index];
    clickedContainer.setAttribute("onclick", `hideGraph(${index})`);

    let playerData = {
        x: leaderLocal[index].variationTime,
        y: leaderLocal[index].variationScore,
        mode: 'lines+markers'
    };

    let data = [playerData];

    let layout = {
        title: `Graph of ${leaderLocal[index].fname.concat(" ", leaderLocal[index].lname).toUpperCase()}`
    };

    Plotly.newPlot(graphDiv, data, layout);
}

function hideGraph(index) {
    let graphDiv = document.getElementById(`graph${index}`);
    graphDiv.innerHTML = "";
    let infoContainers = document.querySelectorAll(".info-container");
    let clickedContainer = infoContainers[index];
    clickedContainer.setAttribute("onclick", `showGraph(${index})`);
}