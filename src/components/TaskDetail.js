import React, { useEffect, useState } from 'react'; // 修正
import { useNavigate } from 'react-router-dom';
import './TaskDetail.css'; 
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TaskDetail = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem('user');
    const url = `${process.env.REACT_APP_NGROK_URL}`;
    const [task, setTask] = useState(null);

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const response = await axios.post(url + '/generate', { user });
                setTask(response.data.task);
            } catch (error) {
                console.error('Error fetching progress data:', error);
            }
        };
        
        fetchProgress();
    }, []);


    const handleAcceptTask = () => {
        navigate('/submit-solution', { state: { task } });
    }

    return (
        <div className="task-detail-container">
            {task ? (
                <>
                    <h2>{task.taskname}</h2>
                    <ReactMarkdown>{task.taskdescription}</ReactMarkdown>
                    <button onClick={handleAcceptTask} style={{ marginRight: '20px' }}>Accept Task</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
            <button onClick={() => navigate(-1)}>Back to Menu</button>
        </div>
    );
};

export default TaskDetail;