import { React } from 'react';

const CharacterList = ({ characters, sprites }) => {

    return (
        <div className='character-list'>
            <h3>Find these Pokémon</h3>
            <ul>
                {characters.map(char => {
                    return (
                        <li>
                            <img className='character-list-sprite' src={sprites.filter(sprite => sprite.name === char.name.toLowerCase())[0].imgUrl}/>
                            <p>{char.name}</p>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CharacterList;