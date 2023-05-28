import '../styles/Leaderboard.css';

const Leaderboard = () => {

    return (
        <div className='leaderboard'>
            <h1>Leaderboard</h1>
            <div>
                <div className='leaderboard-container'>
                    <h2>Level 1</h2>
                    <ul className='leaderboard'>
                        <li className='leaderboard-header'>
                            <p>Name</p>
                            <p>Time</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>AAA</p>
                            <p>01:00:00</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>AAA</p>
                            <p>01:00:00</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>AAA</p>
                            <p>01:00:00</p>
                        </li>
                    </ul>
                </div>
                <div className='leaderboard-container'>
                    <h2>Level 2</h2>
                    <ul className='leaderboard'>
                        <li className='leaderboard-header'>
                            <p>Name</p>
                            <p>Time</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>BBB</p>
                            <p>02:00:00</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>BBB</p>
                            <p>02:00:00</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>BBB</p>
                            <p>02:00:00</p>
                        </li>
                    </ul>
                </div>
                <div className='leaderboard-container'>
                    <h2>Level 3</h2>
                    <ul className='leaderboard'>
                        <li className='leaderboard-header'>
                            <p>Name</p>
                            <p>Time</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>CCC</p>
                            <p>03:00:00</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>CCC</p>
                            <p>03:00:00</p>
                        </li>
                        <li className='leaderboard-row'>
                            <p>CCC</p>
                            <p>03:00:00</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;