import React from 'react';

const CharacterDropdown = ({ potentialChars, position }) => {
    
    return (
        <div className='dropdown-menu' style={{
            left: `${position.left}px`,
            top: `${position.top}px`,
        }}>
            <ul>
                {potentialChars.map(char => {
                    if (!char.isFound)
                        return (
                            <li>
                                <p>{char.name}</p>
                            </li>
                        );
                })}
            </ul>
        </div>
    );
};

export default CharacterDropdown;