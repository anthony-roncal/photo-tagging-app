import { useState, useEffect } from 'react';

const Stopwatch = ({ isActive, setIsActive }) => {
    const [time, setTime] = useState(0);

    const startStopwatch = () => {
        setIsActive(true);
    };

    const stopStopwatch = () => {
        setIsActive(false);
    };

    const resetStopwatch = () => {
        setIsActive(false);
        setTime(0);
    };

    const formatTime = (timeInMs) => {
        let min = ('0' + Math.floor((timeInMs / 60000))).slice(-2);
        let sec = ('0' + Math.floor((timeInMs / 1000) % 60)).slice(-2);
        let ms = ('0' + ((timeInMs / 10) % 100)).slice(-2);
        return `${min}:${sec}:${ms}`;
    };

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [isActive]);

    return (
        <>
            <div className='btn-row'>
                <button onClick={startStopwatch}>Start Stopwatch</button>
                <button onClick={stopStopwatch}>Stop Stopwatch</button>
                <button onClick={resetStopwatch}>Reset Stopwatch</button>
            </div>
            <p>{formatTime(time)}</p>
        </>
    );
};

export default Stopwatch;