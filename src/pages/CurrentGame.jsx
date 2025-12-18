import { useEffect, useRef, useState } from 'react';
import { getGame, saveGame } from '../utils/storage';
import { Link, useParams } from 'react-router';
import NumericKeypad from '../components/NumericKeypad';

const CurrentGame = () => {
    const { id } = useParams();
    const bottomRef = useRef(null);

    const [activeSide, setActiveSide] = useState('us');

    const [game, setGame] = useState(() => {
        const existing = getGame(id);
        if (existing) return existing;

        const newGame = {
            id,
            date: new Date().toLocaleDateString('bg-BG'),
            teams: { us: 'Ние', them: 'Вие' },
            games: [
                {
                    gameNumber: 1,
                    rounds: [],
                    totalUs: 0,
                    totalThem: 0,
                },
            ],
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
            const games = [...prev.games];
            const currentIndex = games.length - 1;
            const currentGame = { ...games[currentIndex] };

            currentGame.rounds = [...currentGame.rounds, { us, them }];
            currentGame.totalUs += us;
            currentGame.totalThem += them;

            let gamesWonUs = prev.gamesWonUs;
            let gamesWonThem = prev.gamesWonThem;

            const gameEnded =
                currentGame.totalUs >= 151 || currentGame.totalThem >= 151;

            if (gameEnded) {
                if (currentGame.totalUs >= 151) gamesWonUs++;
                if (currentGame.totalThem >= 151) gamesWonThem++;

                games.push({
                    gameNumber: currentGame.gameNumber + 1,
                    rounds: [],
                    totalUs: 0,
                    totalThem: 0,
                });
            }

            games[currentIndex] = currentGame;

            const updatedGame = {
                ...prev,
                games,
                gamesWonUs,
                gamesWonThem,
            };

            saveGame(updatedGame);
            return updatedGame;
        });

        setInputUs('');
        setInputThem('');
    };

    const currentGame = game.games[game.games.length - 1];
    const roundsWithTotals = currentGame.rounds.reduce(
        (acc, round) => {
            const prevUs = acc.runningUs;
            const prevThem = acc.runningThem;

            acc.list.push({
                prevUs,
                prevThem,
                us: round.us,
                them: round.them,
            });

            acc.runningUs += round.us;
            acc.runningThem += round.them;

            return acc;
        },
        { runningUs: 0, runningThem: 0, list: [] }
    ).list;

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [roundsWithTotals]);

    return (
        <main className="font-custom">
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
                    <hr className="border-t-2 border-amber-700" />

                    <div className="grid grid-cols-2 items-center text-5xl py-1 font-semibold">
                        <h1 className="text-center">{game.gamesWonUs}</h1>
                        <h1 className="text-center">{game.gamesWonThem}</h1>
                    </div>
                    <hr className="border-t-2 border-amber-700" />
                </div>

                <div className="flex-1 overflow-y-auto flex flex-col font-mon">
                    {roundsWithTotals.map((round, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-2 items-center text-3xl py-1.5 border-b border-black/5"
                        >
                            <div className="grid grid-cols-[4ch_2ch_4ch] justify-center border-r border-black/10">
                                <span className="text-right">
                                    {round.prevUs}
                                </span>
                                <span className="text-center">-</span>
                                <span className="text-left">{round.us}</span>
                            </div>

                            <div className="grid grid-cols-[4ch_2ch_4ch] justify-center">
                                <span className="text-right">
                                    {round.prevThem}
                                </span>
                                <span className="text-center">-</span>
                                <span className="text-left">{round.them}</span>
                            </div>
                        </div>
                    ))}

                    <div ref={bottomRef} />

                    <div className="grid grid-cols-2 items-center text-3xl py-1.5 font-bold">
                        <div className="grid grid-cols-[4ch_2ch_4ch] justify-center border-r border-black/10">
                            <span className="text-right">
                                {currentGame.totalUs}
                            </span>
                            <span className="text-center">-</span>
                            <input
                                type="text"
                                value={inputUs}
                                onChange={(e) => setInputUs(e.target.value)}
                                onFocus={() => setActiveSide('us')}
                                className="w-[4ch] bg-transparent text-left outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-[4ch_2ch_4ch] justify-center">
                            <span className="text-right">
                                {currentGame.totalThem}
                            </span>
                            <span className="text-center">-</span>
                            <input
                                type="text"
                                value={inputThem}
                                onChange={(e) => setInputThem(e.target.value)}
                                onFocus={() => setActiveSide('them')}
                                className="w-[4ch] bg-transparent text-left outline-none"
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
        </main>
    );
};

export default CurrentGame;
