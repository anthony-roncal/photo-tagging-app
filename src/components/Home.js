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
    serverTimestamp,
} from 'firebase/firestore';
import Stopwatch from './Stopwatch';
import CharacterDropdown from './CharacterDropdown';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

const Home = () => {
    const [level, setLevel] = useState('0');
    const [imgUrl, setImgUrl] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [time, setTime] = useState(0);
    const [characters, setPotentialChars] = useState([
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
    const [clickCoords, setClickCoords] = useState({x: 0, y: 0});

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
        let leftOffset = (window.innerWidth - 1280) / 2;
        setShowDropdown(!showDropdown);
        if (e.target.className === 'play-img')
            setDropdownCoords({ left: e.pageX - leftOffset, top: e.pageY - topOffset });
        console.log(`${e.pageX}, ${e.pageY}`);
        setClickCoords({x: (e.pageX - leftOffset), y: e.pageY});
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
                //TODO: build prompt to ask player name
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
            <Stopwatch isActive={isActive} setIsActive={setIsActive} time={formatTime(time)} setTime={setTime} />
            <button onClick={saveScore}>Test Score</button>
            {(level > 0) && <h1>Level {level}</h1>}
            <div className='play-area' >
                <img className='play-img' src={imgUrl} onClick={handleImageClick} />
                {showDropdown && <CharacterDropdown characters={characters}
                    setPotentialChars={setPotentialChars} level={level} position={dropdownCoords}
                    showDropdown={showDropdown} setShowDropdown={setShowDropdown} clickCoords={clickCoords}/>}
                {level === '1' && characters.filter(char => char.name === 'Pikachu' && char.level === '1')[0].isFound &&
                    <div className='char-box' style={{ left: `888px`, top: `405px`, width: `60px`, height: `50px` }}></div>}
                {level === '1' && characters.filter(char => char.name === 'Psyduck' && char.level === '1')[0].isFound &&
                    <div className='char-box' style={{ left: `247px`, top: `255px`, width: `47px`, height: `47px` }}></div>}
                {level === '1' && characters.filter(char => char.name === 'Blissey' && char.level === '1')[0].isFound &&
                    <div className='char-box' style={{ left: `638px`, top: `588px`, width: `65px`, height: `70px` }}></div>}
                {level === '2' && characters.filter(char => char.name === 'Pikachu' && char.level === '2')[0].isFound &&
                    <div className='char-box' style={{ left: `290px`, top: `950px`, width: `40px`, height: `50px` }}></div>}
                {level === '2' && characters.filter(char => char.name === 'Metapod' && char.level === '2')[0].isFound &&
                    <div className='char-box' style={{ left: `735px`, top: `742px`, width: `28px`, height: `40px` }}></div>}
                {level === '2' && characters.filter(char => char.name === 'Dragonair' && char.level === '2')[0].isFound &&
                    <div className='char-box' style={{ left: `770px`, top: `232px`, width: `28px`, height: `45px` }}></div>}
                {level === '3' && characters.filter(char => char.name === 'Pikachu' && char.level === '3')[0].isFound &&
                    <div className='char-box' style={{ left: `195px`, top: `608px`, width: `48px`, height: `45px` }}></div>}
                {level === '3' && characters.filter(char => char.name === 'Teddiursa' && char.level === '3')[0].isFound &&
                    <div className='char-box' style={{ left: `1158px`, top: `657px`, width: `33px`, height: `37px` }}></div>}
                {level === '3' && characters.filter(char => char.name === 'Meowth' && char.level === '3')[0].isFound &&
                    <div className='char-box' style={{ left: `715px`, top: `323px`, width: `30px`, height: `43px` }}></div>}

                {/* <div className='debug'>
                    <p>Click: {clickCoords.x}, {clickCoords.y}</p>
                </div> */}
            </div>
        </div>
    );
}

export default Home;
