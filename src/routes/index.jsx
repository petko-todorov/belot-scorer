import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Home from '../pages/Home';
import GameMenu from '../pages/GameMenu';
import CurrentGame from '../pages/CurrentGame';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<GameMenu />} />
                <Route path="/game/:id" element={<CurrentGame />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
