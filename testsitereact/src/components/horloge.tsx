import { useState, useEffect } from 'react';
import clockImage from '../assets/Navbar/cadran_horloge.png';

export default function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const getRotation = (unit: number, max: number) => {
        return ((unit % max) / max) * 360;
    };

    const hourRotation = getRotation(time.getHours() % 12, 12) + (getRotation(time.getMinutes(), 60) / 12);
    const minuteRotation = getRotation(time.getMinutes(), 60) + (getRotation(time.getSeconds(), 60) / 60);
    const secondRotation = getRotation(time.getSeconds(), 60);

    return (
        <div className="relative w-16 h-16">
            <img src={clockImage} alt="Cadran de l'horloge" className="absolute inset-0 " />
            <div className="hour-hand absolute w-[2px] h-[18px] bg-white transform origin-bottom" style={{ left: '51%', top: '51%', transform: `translate(-50%, -100%) rotate(${hourRotation}deg)` }}></div>
            <div className="minute-hand absolute w-[2px] h-[20px] bg-gray-400 transform origin-bottom z-10" style={{ left: '51%', top: '51%', transform: `translate(-50%, -100%) rotate(${minuteRotation}deg)` }}></div>
            <div className="second-hand absolute w-[2px] h-[25px] bg-red-500 transform origin-bottom" style={{ left: '51%', top: '51%', transform: `translate(-50%, -100%) rotate(${secondRotation}deg)` }}></div>
            <div className="center absolute w-2 h-2 bg-black rounded-full z-10" style={{ left: '51%', top: '51%', transform: 'translate(-50%, -50%)' }}></div>
        </div>
    );
}
