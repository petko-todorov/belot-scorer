import { useState } from 'react';
import { getGame, saveGame } from '../utils/storage';
import { Link, useParams } from 'react-router';

const CurrentGame = () => {
    const { id } = useParams();

    const [game, setGame] = useState(() => {
        const existing = getGame(id);
        if (existing) return existing;

        const newGame = {
            id,
            date: new Date().toLocaleDateString('bg-BG'),
            teams: { us: 'Ние', them: 'Вие' },
            currentGame: [],
            gamesWonUs: 0,
            gamesWonThem: 0,
        };

        saveGame(newGame);
        return newGame;
    });

    const [inputUs, setInputUs] = useState('');
    const [inputThem, setInputThem] = useState('');

    const handleAdd = () => {
        const us = Number(inputUs) || 0;
        const them = Number(inputThem) || 0;

        setGame((prev) => {
            const updatedGame = {
                ...prev,
                currentGame: [...prev.currentGame, { us, them }],
            };

            saveGame(updatedGame);
            return updatedGame;
        });

        setInputUs('');
        setInputThem('');
    };

    const roundsWithTotals = [];
    let runningUs = 0;
    let runningThem = 0;

    for (const round of game.currentGame) {
        roundsWithTotals.push({
            prevUs: runningUs,
            prevThem: runningThem,
            us: round.us,
            them: round.them,
        });
        runningUs += round.us;
        runningThem += round.them;
    }

    const totalUs = game.currentGame.reduce((sum, round) => sum + round.us, 0);
    const totalThem = game.currentGame.reduce(
        (sum, round) => sum + round.them,
        0
    );

    return (
        <>
            <div className="flex justify-between items-center px-4 pt-5 pb-1.5 text-xl">
                <Link to="/menu">‹Назад</Link>
                <h1>Игра</h1>
                <h1></h1>
            </div>
            <hr />
            <div className="grid grid-cols-2 items-center text-5xl py-1 font-semibold">
                <h1 className="text-center">{game.teams.us}</h1>
                <h1 className="text-center">{game.teams.them}</h1>
            </div>
            <hr className="max-w-screen border-t-2 border-amber-700" />
            <div className="grid grid-cols-2 items-center text-5xl py-1 font-semibold">
                <h1 className="text-center">{game.totalUs}</h1>
                <h1 className="text-center">{game.totalThem}</h1>
            </div>
            <hr className="max-w-screen border-t-2 border-amber-700" />
            {roundsWithTotals.map((round, index) => (
                <div
                    key={index}
                    className="grid grid-cols-2 items-center text-3xl py-1.5 border-b border-black/5"
                >
                    <div className="text-center border-r border-black/10">
                        {round.prevUs} - {round.us}
                    </div>
                    <div className="text-center">
                        {round.prevThem} - {round.them}
                    </div>
                </div>
            ))}
            <div className="grid grid-cols-2 items-center text-3xl py-1.5 font-bold">
                <div className="text-center">
                    <span>{totalUs}</span>
                    <span> -</span>
                    <input
                        type="number"
                        value={inputUs}
                        onChange={(e) => setInputUs(e.target.value)}
                        placeholder="0"
                        className="w-[2ch] text-center inline-block"
                    />
                </div>

                <div className="flex justify-center items-center gap-1">
                    <span>{totalThem}</span>
                    <span>-</span>
                    <input
                        type="text"
                        value={inputThem}
                        onChange={(e) => setInputThem(e.target.value)}
                        placeholder="0"
                        className="w-[2ch] text-center inline-block"
                    />
                </div>
            </div>
            Временно
            <button onClick={handleAdd}>Add</button>
        </>
    );
};

export default CurrentGame;
