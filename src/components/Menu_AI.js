import React from 'react';
import './Menu_AI.css'; // CSSファイルをインポート
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const MenuAI = () => {
    const navigate = useNavigate();
    const user=localStorage.getItem('user');
    const progress=localStorage.getItem('progress');
    const url = `${process.env.REACT_APP_NGROK_URL}`;

    const tasks = [
        { id: 1, name: 'Task 1', description: 'Description of Task 1' },
        // Add more tasks as needed
    ];

    const userStatus = {
        name: user,
        level: progress,
        // Add more user status details as needed
    };

    const [progressData, setProgressData] = useState(null);
    
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.post(url + '/get_progress', { user });
                setProgressData(response.data.tasks);
            } catch (error) {
                console.error('Error fetching progress data:', error);
            }
        };

        fetchProgress();
    }, []);

    return (
        <div className="container">
            <div className="left-panel">
                <section>
                    <h2>New Task Generate</h2>
                    <ul className="scrollable">
                        {tasks && tasks.map(task => (
                            <li key={task.id} className="task-box">
                                <button onClick={() => navigate('/task-detail', { state: { task } })}>
                                    <h3 style={{textAlign:'center'}}>新しいタスクを生成する！</h3>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
                <section>
                    <h2>Completed Tasks</h2>
                    <ul className="scrollable">
                        {progressData && progressData.map(task => (
                            <li key={task.id} className="task-box">
                                <button onClick={() => navigate('/complete-task', { state: { task } })}>
                                    <h3>{task.taskname}</h3>
                                    <p>{task.taskdescription}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
            
            <div className="right-panel">
                <section>
                    <h2>User Status</h2>
                    <p>Name: {userStatus.name}</p>
                    <p>Level: {userStatus.level}</p>
                    <button onClick={() => navigate('/profile')}>View Profile</button>
                </section>
            </div>
        </div>
    );
};

export default MenuAI;