import { useEffect } from 'react';
import AppRoutes from './routes';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

function App() {
    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            StatusBar.setBackgroundColor({ color: '#ededed' });
            StatusBar.setStyle({ style: Style.Dark });
        }
    }, []);
    return <AppRoutes />;
}

export default App;
