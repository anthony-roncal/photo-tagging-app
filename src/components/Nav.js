import '../styles/Nav.css';
import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <div className='nav'>
            <h1>Logo</h1>
            <ul className='nav-links'>
                <Link to='/'>
                    <li>Home</li>
                </Link>
                <Link to='/leaderboard'>
                    <li>Leaderboard</li>
                </Link>
            </ul>
        </div>
    );
}

export default Nav;