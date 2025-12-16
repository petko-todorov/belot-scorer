import { useState } from 'react';
import { getGame, saveGame } from '../utils/storage';
import { useParams } from 'react-router';

const CurrentGame = () => {
    const { id } = useParams();

    const [game, setGame] = useState(() => {
        if (id) {
            // old game
            return getGame(id);
        } else {
            //
            return {
                id: `${new Date().toLocaleDateString('bg-BG')}-${Date.now()}`,
                date: new Date().toLocaleDateString('bg-BG'),
                teams: {
                    us: 'Ние',
                    them: 'Вие',
                },
                rounds: [],
                totalUs: 0,
                totalThem: 0,
                isFinished: false,
            };
        }
    });

    const addRound = (usScore, themScore) => {
        const newGame = {
            ...game,
            rounds: [...game.rounds, { us: usScore, them: themScore }],
            totalUs: game.totalUs + usScore,
            totalThem: game.totalThem + themScore,
        };

        setGame(newGame);
        saveGame(newGame); // Запази в localStorage
    };

    return (
        <>
            <h1>Current Game</h1>
        </>
    );
};

export default CurrentGame;
