import '../styles/App.css';
import { useState, useEffect } from 'react';
import {
    getStorage,
    ref,
    getDownloadURL,
} from 'firebase/storage';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    orderBy,
    limit,
    onSnapshot,
    setDoc,
    updateDoc,
    doc,
    serverTimestamp,
  } from 'firebase/firestore';
import Stopwatch from './Stopwatch';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

function Home() {
    const [level, setLevel] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);

    const handleLevelButtonClick = (e) => {
        let selectedLevel = e.target.dataset.level;
        setLevel(selectedLevel);
        setImgUrl(LOADING_IMAGE_URL);
        getImageUrl(`poke${selectedLevel}.webp`);
    };

    const getImageUrl = async (filePath) => {
        const newImageRef = ref(getStorage(), filePath);
        const publicImageUrl = await getDownloadURL(newImageRef);
        setImgUrl(publicImageUrl);
    };

    const formatTime = (timeInMs) => {
        let min = ('0' + Math.floor((timeInMs / 60000))).slice(-2);
        let sec = ('0' + Math.floor((timeInMs / 1000) % 60)).slice(-2);
        let ms = ('0' + ((timeInMs / 10) % 100)).slice(-2);
        return `${min}:${sec}:${ms}`;
    };

    async function saveScore() {
        try {
            await addDoc(collection(getFirestore(), 'scores'), {
                name: 'AAA',
                level: level,
                time: formatTime(time),
                timestamp: serverTimestamp()
            });
        }
        catch (error) {
            console.error('Error writing new message to Firebase Database', error);
        }
    }

    return (
        <div className="Home">
            <div className='btn-row'>
                <button onClick={handleLevelButtonClick} data-level={'1'}>Level 1</button>
                <button onClick={handleLevelButtonClick} data-level={'2'}>Level 2</button>
                <button onClick={handleLevelButtonClick} data-level={'3'}>Level 3</button>
            </div>
            <Stopwatch isActive={isActive} setIsActive={setIsActive} time={time} setTime={setTime} formatTime={formatTime}/>
            <button onClick={saveScore}>Test Score</button>
            {(level > 0) && <h1>Level {level}</h1>}
            <img src={imgUrl}></img>
        </div>
    );
}

export default Home;
