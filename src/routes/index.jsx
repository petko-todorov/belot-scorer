import { Routes, Route, Navigate } from 'react-router';
import Home from '../pages/Home';
import Menu from '../pages/Menu';
import Game from '../pages/Game';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/game/:id" element={<Game />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRoutes;
