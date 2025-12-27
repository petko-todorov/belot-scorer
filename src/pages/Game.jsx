import { Link, useParams } from 'react-router';
import { useGame } from '../hooks/useGame';
import GameHistory from '../components/GameHistory';
import ScoreInput from '../components/ScoreInput';
import ModalWin from '../components/ModalWin';

const Game = () => {
    const { id } = useParams();

    const {
        game,
        currentGame,
        inputUs,
        inputThem,
        setInputUs,
        setInputThem,
        handleAdd,
        confirmEndGame,
        openModal,
        setOpenModal,
        bottomRef,
        usRef,
        themRef,
        maxUsInGame,
        maxThemInGame,
    } = useGame(id);

    return (
        <main className="font-custom">
            <div className="h-screen flex flex-col">
                <header className="shrink-0">
                    <div className="flex justify-between px-4 pt-5 pb-1.5 text-xl">
                        <Link to="/menu">‹Назад</Link>
                        <h1>Игра</h1>
                        <span className="mr-15" />
                    </div>

                    <hr />

                    <div className="grid grid-cols-2 text-4xl py-1 font-semibold">
                        <h1 className="text-center">{game.teams.us}</h1>
                        <h1 className="text-center">{game.teams.them}</h1>
                    </div>
                </header>

                <section className="flex-1 overflow-y-auto">
                    <GameHistory
                        games={game.games}
                        maxUsInGame={maxUsInGame}
                        maxThemInGame={maxThemInGame}
                    />

                    <div ref={bottomRef} />

                    <div className="grid grid-cols-2 text-3xl py-1.5">
                        <ScoreInput
                            total={currentGame.totalUs}
                            value={inputUs}
                            onChange={setInputUs}
                            inputRef={usRef}
                            onEnter={handleAdd}
                        />
                        <ScoreInput
                            total={currentGame.totalThem}
                            value={inputThem}
                            onChange={setInputThem}
                            inputRef={themRef}
                            onEnter={handleAdd}
                        />
                    </div>
                </section>
            </div>

            <ModalWin
                openModal={openModal}
                confirmEndGame={confirmEndGame}
                cancelEndGame={() => setOpenModal(false)}
            />
        </main>
    );
};

export default Game;
