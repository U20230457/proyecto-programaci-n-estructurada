let players = [];

function loadPlayersFromLocalStorage(){
    const storagePlayers = localStorage.getItem('players')
    if (storagePlayers){
        players = JSON.parse(storagePlayers)
    }else{
        players = []
    }

    savePlayersToLocalStorage()
}

function savePlayersToLocalStorage(){
    localStorage.setItem('players', JSON.stringify(players))
}

loadPlayersFromLocalStorage()

function createTableScore() {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Players</th>
        <th>Score</th>
    `;
    tbody.appendChild(headerRow);

    // Ordenar los jugadores por puntaje de mayor a menor
    const sortedPlayers = players.sort((a, b) => b.score - a.score);
    const topPlayers = sortedPlayers.slice(0, 10); // Obtener los primeros 10 jugadores

    topPlayers.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.name}</td>
            <td>${player.score}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const divTable = document.querySelector('.table-score');
    divTable.innerHTML = '';
    divTable.appendChild(table);
}

const botton = document.getElementById('add-botton');
const userInput = document.getElementById('input-user');

createTableScore();