const GameHistory = ({ games }) => {
    return games.map((g, index) => {
        const winsUs = games
            .slice(0, index)
            .filter((gg) => gg.winner === 'us').length;

        const winsThem = games
            .slice(0, index)
            .filter((gg) => gg.winner === 'them').length;

        const maxUsInThisGame = Math.max(0, ...g.rounds.map((r) => r.us));
        const maxThemInThisGame = Math.max(0, ...g.rounds.map((r) => r.them));

        let runningUs = 0;
        let runningThem = 0;

        return (
            <section key={g.gameNumber} className="relative">
                <div className="sticky top-0 z-10 border-y-2 border-stone-400 bg-[#D4C6B6]">
                    <div className="grid grid-cols-2 text-4xl py-1 font-semibold">
                        <h1 className="text-center">{winsUs}</h1>
                        <h1 className="text-center">{winsThem}</h1>
                    </div>
                </div>

                {g.rounds.map((round, i) => {
                    const prevUs = runningUs;
                    const prevThem = runningThem;

                    runningUs += round.us;
                    runningThem += round.them;

                    const showFinalTotalSum =
                        g.winner && i === g.rounds.length - 1;

                    return (
                        <div key={i}>
                            <div className="grid grid-cols-2 text-3xl py-1.5 border-y border-stone-400">
                                <ScoreLine
                                    prev={prevUs}
                                    value={round.us}
                                    isMax={
                                        round.us === maxUsInThisGame &&
                                        round.us > 0
                                    }
                                />
                                <ScoreLine
                                    prev={prevThem}
                                    value={round.them}
                                    isMax={
                                        round.them === maxThemInThisGame &&
                                        round.them > 0
                                    }
                                />
                            </div>

                            {showFinalTotalSum && (
                                <div className="grid grid-cols-2 text-3xl py-1 text-center">
                                    <span>{runningUs}</span>
                                    <span>{runningThem}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </section>
        );
    });
};

const ScoreLine = ({ prev, value, isMax }) => (
    <div className="grid grid-cols-[4ch_2ch_4ch] justify-center max-sm:grid-cols-[1fr_0.5fr_1fr]">
        <span className="text-right">{prev}</span>
        <span className="text-center">-</span>
        {/* <span className="text-left">{value}</span> */}
        <span className={`text-left ${isMax ? 'text-red-600' : ''}`}>
            {value}
        </span>
    </div>
);

export default GameHistory;
