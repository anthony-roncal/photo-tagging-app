import React from 'react';

const CharacterDropdown = ({ potentialChars, setPotentialChars, level, position, showDropdown, setShowDropdown }) => {

    const handleCharSelect = (e) => {
        let result = potentialChars.filter(char => char.name === e.target.dataset.char && char.level === level);
        console.log(result);
        if (result.length === 1) {
            //TODO: validate that position is within character space
            let selectedChar = result[0];
            let index = potentialChars.indexOf(selectedChar);
            selectedChar.isFound = true;
            setPotentialChars(potentialChars.slice(0, index).concat(selectedChar).concat(potentialChars.slice(index + 1)));
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