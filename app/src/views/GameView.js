import React from 'react';

export default ({ data, status, socket }) => {
    let message = '';
    switch (status){
        case 'waiting' :
            message = "En attente d'un autre joueur";
            break;
        case 'playing' :
            message = 'Le combat commence';
            break;
        default :
            message = 'Bizarre, quelque chose ne fonctionne pas correctement'
    }

    const triggerAction1 = () => {
        if ( data?.turn && (data.turn === "you") ) {
            socket.emit('move', 0);
        }
        else {
            message = 'is not your turn';
        }
    }
    const triggerAction2 = () => {
        if ( data?.turn && (data.turn === "you") ) {
            socket.emit('move', 1);
        }
        else {
            message = 'is not your turn';
        }
    }
    const triggerAction3 = () => {
        if ( data?.turn && (data.turn === "you") ) {
            socket.emit('move', 2);
        }
        else {
            message = 'is not your turn';
        }
    }
    const triggerAction4 = () => {
        if ( data?.turn && (data.turn === "you") ) {
            socket.emit('move', 3);
        }
        else {
            message = 'is not your turn';
        }
    }
    return (
        <>
            <div className="c-game">
                <div className="c-game-row">
                    <div className="c-pokemon-info">
                        {data?.opponent?.pokemon && ( data.opponent.pokemon.name)}
                        {data?.opponent?.pokemon && (<div className="c-pokemon__hp" style={{ '--pokemon-hp-percent': data.opponent.pokemon.hp }} /> )}
                    </div>
                    <div className="c-pokemon">
                        <div className="c-pokemon__image">
                            {data?.opponent?.pokemon && (
                                <img alt="Opponent Pokemon" src={data.opponent.pokemon.image} />
                            )}
                        </div>
                    </div>
                </div>
                <div className="c-game-row">
                    <div className="c-pokemon">
                        <div className="c-pokemon__image">
                            <img
                                alt="Mine Pokemon"
                                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
                            />
                        </div>
                    </div>
                    <div className="c-pokemon-info">
                        {data?.you?.pokemon && (data.you.pokemon.name)}
                        {data?.you?.pokemon && (<div className="c-pokemon__hp" style={{ '--pokemon-hp-percent': data.you.pokemon.hp }} /> )}
                    </div>
                </div>
            </div>
            <div className="c-game-info">
                <div className="c-message">
                    {message}
                    <div className="c-form u-mt-base">
                        <button onClick={() => console.log('TODO')}>Retourner au menu</button>
                    </div>
                </div>
                <div className="c-actions">
                    <button className="c-actions__action" onClick={() => {triggerAction1()}}>
                        { data?.you?.pokemon?.moves['0'] && ( data.you.pokemon.moves['0'].name)}
                    </button>
                    <button className="c-actions__action" onClick={() => {triggerAction2()}}>
                        { data?.you?.pokemon?.moves['1'] && ( data.you.pokemon.moves['1'].name)}
                    </button>
                    <button className="c-actions__action" onClick={() => {triggerAction3()}}>
                        { data?.you?.pokemon?.moves['2'] && ( data.you.pokemon.moves['2'].name)}
                    </button>
                    <button className="c-actions__action" onClick={() => {triggerAction4()}} disabled>
                        { data?.you?.pokemon?.moves['3'] && ( data.you.pokemon.moves['3'].name)}
                    </button>
                </div>
            </div>
        </>
    );
};