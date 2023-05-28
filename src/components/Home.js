import '../styles/App.css';
import { useState, useEffect } from 'react';
import {
    getStorage,
    ref,
    getDownloadURL,
} from 'firebase/storage';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

function Home() {
    const [imgUrl, setImgUrl] = useState('');
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const handleLevelButtonClick = (e) => {
        setImgUrl(LOADING_IMAGE_URL);
        getImageUrl(`poke${e.target.dataset.level}.webp`);
    };

    const getImageUrl = async (filePath) => {
        const newImageRef = ref(getStorage(), filePath);
        const publicImageUrl = await getDownloadURL(newImageRef);
        setImgUrl(publicImageUrl);
    };

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
        let min = ('0' + Math.floor((timeInMs/60000))).slice(-2);
        let sec = ('0' + Math.floor((timeInMs/1000)%60)).slice(-2);
        let ms = ('0' + ((timeInMs/10)%100)).slice(-2);
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
        <div className="Home">
            <div className='btn-row'>
                <button onClick={handleLevelButtonClick} data-level={'1'}>Level 1</button>
                <button onClick={handleLevelButtonClick} data-level={'2'}>Level 2</button>
                <button onClick={handleLevelButtonClick} data-level={'3'}>Level 3</button>
            </div>
            <div className='btn-row'>
                <button onClick={startStopwatch}>Start Stopwatch</button>
                <button onClick={stopStopwatch}>Stop Stopwatch</button>
                <button onClick={resetStopwatch}>Reset Stopwatch</button>
            </div>
                <p>{formatTime(time)}</p>
            <img src={imgUrl}></img>
        </div>
    );
}

export default Home;
