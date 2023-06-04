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
import Modal from './Modal';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

const Home = () => {
    const [level, setLevel] = useState('0');
    const [imgUrl, setImgUrl] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [time, setTime] = useState(0);
    const [characters, setCharacters] = useState([
        { level: '1', name: 'Pikachu', isFound: false, left: `888px`, top: `405px`, width: `60px`, height: `50px` },
        { level: '1', name: 'Psyduck', isFound: false, left: `247px`, top: `255px`, width: `47px`, height: `47px` },
        { level: '1', name: 'Blissey', isFound: false, left: `638px`, top: `588px`, width: `65px`, height: `70px` },
        { level: '2', name: 'Pikachu', isFound: false, left: `290px`, top: `950px`, width: `40px`, height: `50px` },
        { level: '2', name: 'Metapod', isFound: false, left: `735px`, top: `742px`, width: `28px`, height: `40px` },
        { level: '2', name: 'Dragonair', isFound: false, left: `770px`, top: `232px`, width: `28px`, height: `45px` },
        { level: '3', name: 'Pikachu', isFound: false, left: `195px`, top: `608px`, width: `48px`, height: `45px` },
        { level: '3', name: 'Teddiursa', isFound: false, left: `1158px`, top: `657px`, width: `33px`, height: `37px` },
        { level: '3', name: 'Meowth', isFound: false, left: `715px`, top: `323px`, width: `30px`, height: `43px` }
    ]);
    const [dropdownCoords, setDropdownCoords] = useState({ left: 0, top: 0 });
    const [showDropdown, setShowDropdown] = useState(false);
    const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });
    const [showModal, setShowModal] = useState(false);

    const handleLevelButtonClick = (e) => {
        let selectedLevel = e.target.dataset.level;
        setLevel(selectedLevel);
        setTime(0);
        setIsGameOver(false);
        setShowDropdown(false);
        setImgUrl(LOADING_IMAGE_URL);
        getImageUrl(`poke${selectedLevel}.webp`);
    };

    const getImageUrl = async (filePath) => {
        console.log('getting image url...');
        const newImageRef = ref(getStorage(), filePath);
        const publicImageUrl = await getDownloadURL(newImageRef);
        console.log(`image url retrieved: ${publicImageUrl}`);
        setImgUrl(publicImageUrl);
    };

    const startGame = () => {
        setIsActive(true);
        setIsGameOver(false);
    };

    const handleImageClick = (e) => {
        let topOffset = 275;
        let leftOffset = (window.innerWidth - 1280) / 2;
        setShowDropdown(!showDropdown);
        if (e.target.className === 'play-img')
            setDropdownCoords({ left: e.pageX - leftOffset, top: e.pageY - topOffset });
        setClickCoords({ x: (e.pageX - leftOffset), y: e.pageY });
    };

    const formatTime = (timeInMs) => {
        let min = ('0' + Math.floor((timeInMs / 60000))).slice(-2);
        let sec = ('0' + Math.floor((timeInMs / 1000) % 60)).slice(-2);
        let ms = ('0' + ((timeInMs / 10) % 100)).slice(-2);
        return `${min}:${sec}:${ms}`;
    };

    useEffect(() => {
        let allFound = true;
        characters.filter(char => char.level === level).forEach(char => {
            if (!char.isFound)
                allFound = false;
            setIsGameOver(false);
        });
        if (allFound && isActive) {
            endGame();
        }
    }, [characters]);

    const endGame = () => {
        setIsActive(false);
        setIsGameOver(true);
        setShowModal(true);
    };

    async function saveScore(playerName) {
        try {
            await addDoc(collection(getFirestore(), 'scores'), {
                name: playerName,
                level: level,
                time: formatTime(time),
                timestamp: serverTimestamp()
            });
        }
        catch (error) {
            console.error('Error writing new message to Firebase Database', error);
        }
    };

    return (
        <div className="Home">
            {showModal && <Modal setShowModal={setShowModal} time={formatTime(time)} saveScore={saveScore} />}
            <div className='menu-area'>
                <div className='btn-row'>
                    <button onClick={handleLevelButtonClick} data-level={'1'}>Level 1</button>
                    <button onClick={handleLevelButtonClick} data-level={'2'}>Level 2</button>
                    <button onClick={handleLevelButtonClick} data-level={'3'}>Level 3</button>
                </div>
                {level !== '0' && <h1>Level {level}</h1>}
                {level !== '0' && <Stopwatch isActive={isActive} setIsActive={setIsActive} time={formatTime(time)} setTime={setTime} />}
            </div>
            <div className='play-area' >
                {level !== '0' && !isActive && !isGameOver && <button className='start' onClick={startGame}>Start</button>}
                {(isActive || isGameOver) && <img className='play-img' src={imgUrl} onClick={handleImageClick} />}
                {showDropdown && <CharacterDropdown characters={characters}
                    setCharacters={setCharacters} level={level} position={dropdownCoords}
                    showDropdown={showDropdown} setShowDropdown={setShowDropdown} clickCoords={clickCoords} />}
                {characters.filter(char => char.level === level).map(char => {
                    return (
                        (isActive || isGameOver) && char.isFound
                        && <div className='char-box' style={{
                            left: char.left,
                            top: char.top,
                            width: char.width,
                            height: char.height
                        }}></div>
                    );
                })}
            </div>
        </div>
    );
}

export default Home;
