export const saveGame = (game) => {
    const games = getGames();
    const index = games.findIndex((g) => g.id === game.id);

    if (index >= 0) {
        games[index] = game;
    } else {
        games.push(game);
    }

    localStorage.setItem('belot-games', JSON.stringify(games));
};

export const getGame = (id) => {
    const games = getGames();
    return games.find((g) => g.id === id);
};

export const getGames = () => {
    const games = localStorage.getItem('belot-games');
    return games ? JSON.parse(games) : [];
};
