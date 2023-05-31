import { React, useState, useEffect } from 'react';
import '../styles/Home.css';
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
import CharacterDropdown from './CharacterDropdown';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

const Home = () => {
    const [level, setLevel] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [potentialChars, setPotentialChars] = useState([
        { level: '1', name: 'Pikachu', isFound: false },
        { level: '1', name: 'Psyduck', isFound: false },
        { level: '1', name: 'Blissey', isFound: false },
        { level: '2', name: 'Pikachu', isFound: false },
        { level: '2', name: 'Metapod', isFound: false },
        { level: '2', name: 'Dragonair', isFound: false },
        { level: '3', name: 'Pikachu', isFound: false },
        { level: '3', name: 'Teddiursa', isFound: false },
        { level: '3', name: 'Meowth', isFound: false }
    ]);
    const [dropdownCoords, setDropdownCoords] = useState({ left: 0, top: 0 });
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleImageClick = (e) => {
        let topOffset = 275;
        let leftOffset = (window.innerWidth - 1280)/2;
        setShowDropdown(!showDropdown);
        if (e.target.className === 'play-img')
            setDropdownCoords({ left: e.pageX - leftOffset, top: e.pageY - topOffset });
    }

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
            <Stopwatch isActive={isActive} setIsActive={setIsActive} time={time} setTime={setTime} formatTime={formatTime} />
            <button onClick={saveScore}>Test Score</button>
            {(level > 0) && <h1>Level {level}</h1>}
            <div className='play-area' >
                <img className='play-img' src={imgUrl} onClick={handleImageClick} />
                {showDropdown && <CharacterDropdown potentialChars={potentialChars}
                    setPotentialChars={setPotentialChars} level={level} position={dropdownCoords}
                    showDropdown={showDropdown} setShowDropdown={setShowDropdown} />}
                {level === '1' && potentialChars.filter(char => char.name === 'Pikachu' && char.level === '1')[0].isFound &&
                    <div className='char-box pikachu' style={{ left: `888px`, top: `405px` }}></div>}
                {level === '1' && potentialChars.filter(char => char.name === 'Psyduck' && char.level === '1')[0].isFound &&
                    <div className='char-box psyduck' style={{ left: `247px`, top: `255px` }}></div>}
                {level === '1' && potentialChars.filter(char => char.name === 'Blissey' && char.level === '1')[0].isFound &&
                    <div className='char-box blissey' style={{ left: `638px`, top: `588px` }}></div>}
            </div>
        </div>
    );
}

export default Home;
