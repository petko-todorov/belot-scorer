import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { deleteGame, getGames } from '../utils/storage';
import SwipeToDelete from 'react-swipe-to-delete-component';
import 'react-swipe-to-delete-component/dist/swipe-to-delete.css';

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

    const handleDelete = (id) => {
        deleteGame(id);
        setGames((prev) => prev.filter((g) => g.id !== id)); // remove from state
    };

    return (
        <>
            <main className="font-custom">
                <header className="flex justify-between items-center px-4 pt-5 pb-1.5 text-xl">
                    <Link to="/">‹Назад</Link>
                    <h1>Игри</h1>
                    <button onClick={newGame}>Нова игра</button>
                </header>
                <hr />
                <ul>
                    {games.map((game) => (
                        <SwipeToDelete
                            key={game.id}
                            onDelete={() => handleDelete(game.id)}
                        >
                            <li
                                key={game.id}
                                onClick={() => continueGame(game.id)}
                                className="select-none bg-[#d4c6b6]"
                            >
                                <section className="mx-4">
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
                                    <hr className="max-w-screen -mx-4 border-t-2 border-stone-400" />
                                </section>
                            </li>
                        </SwipeToDelete>
                    ))}
                </ul>
            </main>
        </>
    );
};

export default Menu;
