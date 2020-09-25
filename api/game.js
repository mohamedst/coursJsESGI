import pokemons from './pokemons.json';

export const startGame = (players, config) => {
    console.log('Game starting...');
    config.turn = Math.floor(Math.random() * 2);

    for (const player of players){
        const index = Math.floor(Math.random() * pokemons.length);
        player.pokemon = { ... pokemons[index] };
    }

    for (const [index, player] of players.entries()){
        const { socket, ...you  } = player;
        const { socket: _, ...opponent } = players.find(player => player.socket.id !== socket.id)

        socket.emit('started', {
            you,
            opponent,
            turn: index === config.turn ? 'you' : 'opponent'
        })
    }



};

export const terminateGame = (socket, players) => {
    console.log('Game terminating...');

    const index = players.findIndex(player => player.socket.id === socket.id);

    if(index !== -1) {
       players.splice(index,1);
    }

    for (const player of players) {
        player.pokemon = null;
        player.socket.emit('terminated')
    }
};

export const handleMove = (moveId, players, config) => {
    const activePlayer = players[config.turn];
    const opponent = players[config.turn === 0? 1:0];
    const move = activePlayer.pokemon.moves[moveId];
    console.log(`${activePlayer.name} with "${activePlayer.pokemon.name}" has played "${move.name}"`);
    opponent.pokemon.hp -= move.power;
    console.log(`${opponent.pokemon.name} (${opponent.pokemon.hp}hp) has taken ${move.power} damages`);
    if(opponent.pokemon.hp <= 0){
        endGame(players);
    }
    else{
        updateGame(moveId,players,config);
    }
};

const updateGame = (moveId, players, config) => {
    if (config.turn === 0){
        config.turn = 1;
    }
    else{
        config.turn= 0;
    }
    for (const [index, player] of players.entries()){
        const { socket, ...you  } = player;
        const { socket: _, ...opponent } = players.find(player => player.socket.id !== socket.id)
        console.log(you);

        socket.emit('moved', {
            you,
            opponent,
            moveId,
            turn: index === config.turn ? 'you' : 'opponent'
        })
    }
};

const endGame = players => {

};