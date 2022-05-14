let playerlist;
const savedplayerlist = JSON.parse(localStorage.getItem('playerlist'));  
                      
if( Array.isArray(savedplayerlist)) {
    playerlist = savedplayerlist;
}
else {
    playerlist = [{
        firstname: 'MARTHA',
        lastname: 'YOHANES',
        timestamp: 'JAN 30,2020 01:09',
        country: 'FINLAND',
        playerscore: 85,
        id: 'id1'
    }, {
        firstname: 'DAVID',
        lastname: 'SMITH',
        timestamp: 'JAN 30,2020 01:09',
        country: 'UNITED KINGDOM',
        playerscore: 80,
        id: 'id2'
    }, {
        firstname: 'ASABENEH',
        lastname: 'YETAYEH',
        timestamp: 'JAN 30,2020 01:09',
        country: 'FINLAND' ,
        playerscore: 75 ,
        id: 'id3'            
    }, {
        firstname: 'MATHIAS',
        lastname: 'ELIAS',
        timestamp: 'JAN 30,2020 01:09',
        country: 'SWEDEN' ,
        playerscore: 70 ,
        id: 'id4'
    }];
}

function createPlayerListItem(firstname,lastname,country,playerscore) {
    const id = '' + new Date().getTime();                                 

    playerlist.push({
        firstname: firstname,
        lastname: lastname,
        timestamp: ,
        country: country,
        playerscore: playerscore,
        id: id                      // so here we are storing a 'number' as an id
    });
    saveplayer();             // whenever data gets updated it is saved in local storage
}11z