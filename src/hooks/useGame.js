import { useEffect, useRef, useState } from 'react';
import { getGame, saveGame } from '../utils/storage';
import { clampScore } from '../utils/score';

export const useGame = (id) => {
    const bottomRef = useRef(null);
    const usRef = useRef(null);
    const themRef = useRef(null);

    const [openModal, setOpenModal] = useState(false);

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
                    winner: null,
                },
            ],
            gamesWon: { us: 0, them: 0 },
        };

        saveGame(newGame);
        return newGame;
    });

    const [inputUs, setInputUs] = useState('');
    const [inputThem, setInputThem] = useState('');

    const handleAdd = () => {
        const us = Number(clampScore(inputUs)) || 0;
        const them = Number(clampScore(inputThem)) || 0;
        if (!us && !them) return;

        setGame((prev) => {
            const games = [...prev.games];
            const index = games.length - 1;
            const current = { ...games[index] };

            current.rounds = [...current.rounds, { us, them }];
            current.totalUs += us;
            current.totalThem += them;

            const ended = current.totalUs >= 151 || current.totalThem >= 151;

            games[index] = current;

            if (ended && current.totalUs !== current.totalThem) {
                setOpenModal(true);
            }

            const updated = {
                ...prev,
                games,
                updatedAt: Date.now(),
            };

            saveGame(updated);
            return updated;
        });

        setInputUs('');
        setInputThem('');
        usRef.current?.blur();
        themRef.current?.blur();
    };

    const confirmEndGame = () => {
        setGame((prev) => {
            const games = [...prev.games];
            const last = games[games.length - 1];
            const gamesWon = { ...prev.gamesWon };

            if (last.totalUs >= 151) {
                gamesWon.us += 1;
                last.winner = 'us';
            } else if (last.totalThem >= 151) {
                gamesWon.them += 1;
                last.winner = 'them';
            }

            games.push({
                gameNumber: last.gameNumber + 1,
                rounds: [],
                totalUs: 0,
                totalThem: 0,
                winner: null,
            });

            const updated = {
                ...prev,
                games,
                gamesWon,
                updatedAt: Date.now(),
            };

            saveGame(updated);
            return updated;
        });

        setOpenModal(false);
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    }, [game]);

    const currentGame = game.games[game.games.length - 1];

    return {
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
    };
};
