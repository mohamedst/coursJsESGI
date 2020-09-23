import pokemons from './pokemons.json';

export const startGame = (players, config) => {
    console.log('Game starting...');
    config.turn = Math.floor(Math.random() * 2);

    for (const player of players){
        const index = Math.floor(Math.random() * pokemons.length);
        player.pokemons = { ... pokemons[index] };
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

    // TODO
};

export const handleMove = (moveId, players, config) => {
    // console.log(`${activePlayer.name} with "${activePlayer.pokemon.name}" has played "${move.name}"`);
    // console.log(`${opponent.pokemon.name} (${opponent.pokemon.hp}hp) has taken ${move.power} damages`);

    // TODO
};

const updateGame = (moveId, players, config) => {
    // TODO
};

const endGame = players => {
    console.log('Game ending...');

    // TODO
};