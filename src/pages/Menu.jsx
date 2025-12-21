import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { getGames } from '../utils/storage';

const Menu = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [games, setGames] = useState([]);

    const loadGames = () => {
        const storedGames = getGames();
        const sorted = [...storedGames].sort((a, b) => {
            const aTime = a.updatedAt || 0;
            const bTime = b.updatedAt || 0;
            return bTime - aTime;
        });
        setGames(sorted);
    };

    useEffect(() => {
        loadGames();
    }, [location]);

    const newGame = () => {
        const id = `${new Date().toLocaleDateString('bg-BG')}-${Date.now()}`;
        navigate(`/game/${id}`);
    };

    const continueGame = (id) => {
        navigate(`/game/${id}`);
    };

    return (
        <>
            <main className="font-custom">
                <div className="flex justify-between items-center px-4 pt-5 pb-1.5 text-xl">
                    <Link to="/">‹Назад</Link>
                    <h1>Игри</h1>
                    <button onClick={newGame}>Нова игра</button>
                </div>
                <hr />
                <ul>
                    {games.map((game) => (
                        <li
                            key={game.id}
                            onClick={() => continueGame(game.id)}
                            className="select-none"
                        >
                            <div className="mx-4">
                                <div className="flex justify-between items-center text-2xl">
                                    <h3 className="font-custom">Игра</h3>
                                    <span>{game.date}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl">Ние</h3>
                                    <span className="font-bold text-3xl">
                                        {game.gamesWon['us']}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xl">Вие</h3>
                                    <span className="font-bold text-3xl">
                                        {game.gamesWon['them']}
                                    </span>
                                </div>
                                <hr className="max-w-screen -mx-4 border-t-2 border-gray-300" />
                            </div>
                        </li>
                    ))}
                </ul>
            </main>
        </>
    );
};

export default Menu;
