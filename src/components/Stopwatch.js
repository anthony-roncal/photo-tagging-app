import { React, useEffect } from 'react';

const Stopwatch = ({ isActive, setIsActive, time, setTime }) => {

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
        <p className='stopwatch'>{time}</p>
    );
};

export default Stopwatch;