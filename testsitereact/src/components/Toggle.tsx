import { useEffect, useState, useRef } from 'react';

export const Toggle = () => {
    const toggleSwitch = useRef<HTMLInputElement>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false); // État pour suivre le mode actuel

    useEffect(() => {
        const switchTheme = (e: Event) => {
            const target = e.target as HTMLInputElement;
            if (target.checked) {
                localStorage.setItem("theme", 'dark');
                document.documentElement.classList.add('dark');
                setIsDarkMode(true); // Mettre à jour l'état pour refléter le mode sombre
            } else {
                localStorage.setItem("theme", 'light');
                document.documentElement.classList.remove('dark')
                setIsDarkMode(false); // Mettre à jour l'état pour refléter le mode clair
            }
        }

        if (toggleSwitch.current) {
            toggleSwitch.current.addEventListener('change', switchTheme, false);
            // Vérifier si l'écran est petit, s'il l'est, utiliser le préférence de l'utilisateur
            const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
            if (prefersDarkScheme.matches) {
                document.documentElement.classList.add('dark');
                setIsDarkMode(true);
            } else {
                document.documentElement.classList.remove('dark');
                setIsDarkMode(false);
            }
        }

        // Cleanup function to remove the event listener
        return () => {
            if (toggleSwitch.current) {
                toggleSwitch.current.removeEventListener('change', switchTheme, false);
            }
        }
    }, []);

    return (
        <div className="flex items-center z-30">
            <label htmlFor="toggleTheme" className="cursor-pointer">
                <svg className={`h-6 w-6 mr-2 ${isDarkMode ? 'text-white' : 'text-black'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {/* Utiliser l'icône appropriée en fonction de l'état du mode */}
                    {isDarkMode ? (
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    ) : (
                        <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    )}
                </svg>
            </label>
            <input
                ref={toggleSwitch}
                type="checkbox"
                id="toggleTheme"
                className="hidden"
            />
        </div>
    );
};
