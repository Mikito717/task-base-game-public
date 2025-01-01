import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Title.css';

const Title = () => {
    const navigate = useNavigate();
    //ローカルストレージからユーザー名を取得
    const username = localStorage.getItem('user');

    const handleAIModeClick = () => {
        navigate('/menu-ai');
    };


    return (
        <>
            <div className="title-container">
                <h1 className="title">AI Learning Game</h1>
                <p className="subtitle">Enhance your skills with fun and interactive AI challenges!</p>
                {username && <p className="welcome-message">ようこそ、{username}さん！</p>}
                <button className="mode-button" onClick={handleAIModeClick}>AI Learning Mode</button>
            </div>
        </>
    );
};

export default Title;