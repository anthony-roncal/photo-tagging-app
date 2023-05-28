import '../styles/App.css';
import { useState } from 'react';
import {
    getStorage,
    ref,
    getDownloadURL,
} from 'firebase/storage';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

function Home() {
    const [imgUrl, setImgUrl] = useState('');

    const handleLevelButtonClick = (e) => {
        setImgUrl(LOADING_IMAGE_URL);
        getImageUrl(`poke${e.target.dataset.level}.webp`);
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
            <img src={imgUrl}></img>
        </div>
    );
}

export default Home;