import React, { useEffect, useState } from 'react';
import './Completetask.css';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const CompleteTask = ({ task }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({});
    const url = `${process.env.REACT_APP_NGROK_URL}`;

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await fetch(url +'/get_task', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user:localStorage.getItem('user'),taskname: location.state.task.taskname }),
                });
                const data = await response.json();
                console.log(data.task);
                setTaskData(data);
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        fetchTaskData();
    }, [location.state.task.taskname, url]);

    return (
        <div className="completetask-div">
            <h1 className="completetask-h1">{location.state.task.taskname}</h1>
            <p className="completetask-p">{location.state.task.taskdescription}</p>
            <h2>あなたの解答</h2>
            {taskData.solution}
            <h2>LLMからの評価</h2>
            {taskData.eval_solution?.feedback}
            <h2>精度</h2>
            <p>{taskData.result?.accuracy !== undefined ? (
                <p>Accuracy: {taskData.result.accuracy*100}%</p>
            ) : (
                <p>Mean Squared Error: {taskData.result?.mse}</p>
            )}</p>
            <h2>コード</h2>
            <p>{taskData.code}</p>
            <button onClick={() => navigate(-1)}>戻る</button>
        </div>
    );
};

export default CompleteTask;