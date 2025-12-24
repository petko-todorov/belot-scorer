import { useEffect } from 'react';
import AppRoutes from './routes';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';

import { useLocation, useNavigate } from 'react-router';
import { App as CapacitorApp } from '@capacitor/app';

function App() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const backHandler = CapacitorApp.addListener('backButton', () => {
            if (location.pathname === '/') {
                CapacitorApp.exitApp();
            } else {
                navigate(-1);
            }
        });

        return () => {
            backHandler.then((h) => h.remove());
        };
    }, [location, navigate]);
    useEffect(() => {
        const applyTheme = async () => {
            if (Capacitor.isNativePlatform()) {
                try {
                    await StatusBar.setOverlaysWebView({ overlay: false });

                    const isDark = window.matchMedia(
                        '(prefers-color-scheme: dark)'
                    ).matches;

                    if (isDark) {
                        await StatusBar.setBackgroundColor({
                            color: '#121212',
                        });
                        await StatusBar.setStyle({ style: Style.Dark }); // БЕЛИ икони
                    } else {
                        await StatusBar.setBackgroundColor({
                            color: '#ffffff',
                        });
                        await StatusBar.setStyle({ style: Style.Light }); // ЧЕРНИ икони
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        };

        applyTheme();

        const watcher = window.matchMedia('(prefers-color-scheme: dark)');
        watcher.addEventListener('change', applyTheme);
        return () => watcher.removeEventListener('change', applyTheme);
    }, []);

    return <AppRoutes />;
}

export default App;
