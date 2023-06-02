import { React, useState } from 'react';
import '../styles/Leaderboard.css';
import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    onSnapshot
} from 'firebase/firestore';

const Leaderboard = () => {
    const [scores, setScores] = useState([]);
    // function loadScores() {
    const recentScoresQuery = query(collection(getFirestore(), 'scores'), orderBy('time', 'asc'), limit(12));

    // Start listening to the query.
    onSnapshot(recentScoresQuery, function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            var score = change.doc.data();
            if (!scores.some(score => change.doc.id === score.id)) {
                setScores([{
                    id: change.doc.id, timestamp: score.timestamp, time: score.time,
                    level: score.level, name: score.name
                }, ...scores]);
            }
        });
    });
    // }

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
                        {scores.map(score => {
                            if (score.level === '1') {
                                return (
                                    <li className='leaderboard-row'>
                                        <p>{score.name}</p>
                                        <p>{score.time}</p>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
                <div className='leaderboard-container'>
                    <h2>Level 2</h2>
                    <ul className='leaderboard'>
                        <li className='leaderboard-header'>
                            <p>Name</p>
                            <p>Time</p>
                        </li>
                        {scores.map(score => {
                            if (score.level === '2') {
                                return (
                                    <li className='leaderboard-row'>
                                        <p>{score.name}</p>
                                        <p>{score.time}</p>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
                <div className='leaderboard-container'>
                    <h2>Level 3</h2>
                    <ul className='leaderboard'>
                        <li className='leaderboard-header'>
                            <p>Name</p>
                            <p>Time</p>
                        </li>
                        {scores.map(score => {
                            if (score.level === '3') {
                                return (
                                    <li className='leaderboard-row'>
                                        <p>{score.name}</p>
                                        <p>{score.time}</p>
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;