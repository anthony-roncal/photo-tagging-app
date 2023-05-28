import '../styles/Nav.css';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className='nav'>
            <Link to='/'>
                <h1>Where's that Pokémon?</h1>
            </Link>
            <ul className='nav-links'>
                <Link to='/'>
                    <li>Play</li>
                </Link>
                <Link to='/leaderboard'>
                    <li>Leaderboard</li>
                </Link>
            </ul>
        </div>
    );
}

export default Nav;