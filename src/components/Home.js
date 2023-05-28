import '../styles/App.css';
import { useState, useEffect } from 'react';
import {
    getStorage,
    ref,
    getDownloadURL,
} from 'firebase/storage';
import Stopwatch from './Stopwatch';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

function Home() {
    const [level, setLevel] = useState(0);
    const [imgUrl, setImgUrl] = useState('');
    const [isActive, setIsActive] = useState(false);

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

    return (
        <div className="Home">
            <div className='btn-row'>
                <button onClick={handleLevelButtonClick} data-level={'1'}>Level 1</button>
                <button onClick={handleLevelButtonClick} data-level={'2'}>Level 2</button>
                <button onClick={handleLevelButtonClick} data-level={'3'}>Level 3</button>
            </div>
            <Stopwatch isActive={isActive} setIsActive={setIsActive}/>
            {(level > 0) && <h1>Level {level}</h1>}
            <img src={imgUrl}></img>
        </div>
    );
}

export default Home;
