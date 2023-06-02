import { React, useState, useEffect } from 'react';
import {
    getFirestore,
    collection,
    query,
    where,
    getDocs
} from 'firebase/firestore';


const CharacterDropdown = ({ potentialChars, setPotentialChars, level, position, showDropdown, setShowDropdown, clickCoords }) => {
    const getCoordinates = async (charName) => {
        const q = query(collection(getFirestore(), 'coordinates'), where('level', '==', level.toString()), where('name', '==', charName));

        const querySnapshot = await getDocs(q);
        let results = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data());
        });
        return results;
    }

    const handleCharSelect = (e) => {
        let result = potentialChars.filter(char => char.name === e.target.dataset.char && char.level === level);
        if (result.length === 1) {
            let selectedChar = result[0];
            // validate click is within character space
            getCoordinates(selectedChar.name.toLowerCase()).then(result => {
                if (clickCoords.x > result[0].minX && clickCoords.x < result[0].maxX && clickCoords.y > result[0].minY && clickCoords.y < result[0].maxY) {
                    console.log('found!');
                    selectedChar.isFound = true;
                    let index = potentialChars.indexOf(selectedChar);
                    setPotentialChars(potentialChars.slice(0, index).concat(selectedChar).concat(potentialChars.slice(index + 1)));
                }
                else
                    console.log('miss');
            });
            setShowDropdown(!showDropdown);
        }
    }

    return (
        <div className='dropdown-menu' style={{ left: `${position.left}px`, top: `${position.top}px` }}>
            <ul>
                {potentialChars.filter(char => char.level === level).map(char => {
                    if (!char.isFound)
                        return (
                            <li data-char={char.name} onClick={handleCharSelect} key={char.name + char.level}>{char.name}</li>
                        );
                })}
            </ul>
        </div>
    );
};

export default CharacterDropdown;