import { useEffect, useRef, useState } from 'react';
import { getGame, saveGame } from '../utils/storage';
import { Link, useParams } from 'react-router';
import NumericKeypad from '../components/NumericKeypad';

const CurrentGame = () => {
    const { id } = useParams();
    const bottomRef = useRef(null);
    const roundsWithTotals = [];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [roundsWithTotals]);

    const [activeSide, setActiveSide] = useState('us'); // 'us' | 'them'

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

    const handleNumberPress = (value) => {
        const setter = activeSide === 'us' ? setInputUs : setInputThem;

        setter((prev) => {
            if (value === 'delete') {
                return prev.slice(0, -1);
            }

            if (value === 'sign') {
                if (!prev) return prev;
                return prev.startsWith('-') ? prev.slice(1) : '-' + prev;
            }

            const next = Number((prev + value).replace(/\D/g, ''));

            if (Number.isNaN(next)) return '';
            if (next > 151) return '151';

            return String(next);
        });
    };

    const handleAdd = () => {
        const us = Number(inputUs) || 0;
        const them = Number(inputThem) || 0;

        if (!us && !them) return;
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
        <div className="h-screen flex flex-col">
            <div className="shrink-0">
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
                    <h1 className="text-center">{game.gamesWonUs}</h1>
                    <h1 className="text-center">{game.gamesWonThem}</h1>
                </div>
                <hr className="max-w-screen border-t-2 border-amber-700" />
            </div>

            <div className="flex-1 overflow-y-auto flex flex-col">
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
                <div ref={bottomRef} />

                <div className="grid grid-cols-2 items-center text-3xl py-1.5 font-bold">
                    <div className="text-center pl-2">
                        <span>{totalUs}</span>
                        <span> -</span>
                        <input
                            type="text"
                            value={inputUs}
                            onChange={(e) => setInputUs(e.target.value)}
                            onFocus={() => setActiveSide('us')}
                            placeholder="0"
                            className="w-[3ch] text-center inline-block"
                        />
                    </div>
                    {/* <button onClick={() => handleEditScore('us')} className="">
                        ✏️
                    </button> */}
                    <div className="text-center pl-2">
                        <span>{totalThem}</span>
                        <span> -</span>
                        <input
                            type="text"
                            value={inputThem}
                            onChange={(e) => setInputThem(e.target.value)}
                            onFocus={() => setActiveSide('them')}
                            placeholder="0"
                            className="w-[3ch] text-center inline-block"
                        />
                    </div>
                </div>
                <div className="shrink-0 mt-auto">
                    <NumericKeypad
                        onNumberPress={handleNumberPress}
                        onAdd={handleAdd}
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentGame;
