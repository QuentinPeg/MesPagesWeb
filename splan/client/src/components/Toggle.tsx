import { useEffect, useRef, useState } from 'react';

function Toggle() {
    
    const [theme, setTheme] = useState(localStorage.theme || 'light');

    const switchTheme = () => {
        if (theme === 'dark') {
            document.documentElement.classList.remove('dark');
            setTheme('light');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            setTheme('dark');
            localStorage.theme = 'dark';
        }
    };

    const toggleSwitch = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="flex items-center z-30">
            <button
                ref={toggleSwitch}
                className="flex justify-center items-center transition-all duration-300 ease-in-out w-9 h-9 rounded-md border border-gray-200 dark:border-none hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-700 focus:outline-none"
                onClick={switchTheme}
            >
                {theme === 'dark' ? (
                    <svg className="h-5 w-5 text-gray-600 hover:text-green-500 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    </svg>
                ) : (
                    <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                    </svg>
                )}
            </button>
        </div>
    );
};

export default Toggle;