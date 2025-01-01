import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin ? `${process.env.REACT_APP_NGROK_URL}/login` : `${process.env.REACT_APP_NGROK_URL}/register`;
    
        try {
            const response = await axios.post(url,  {
                user: username,
                password: password
            },{
            headers: {
                'Content-Type': 'application/json'
            }
            });
            setMessage(response.data.message);
            if (response.status === 200) {
                //usernameをlocalStorageに保存
                localStorage.setItem('user', username);
                localStorage.setItem('progress', response.data.progress);
                localStorage.setItem('register', !isLogin);
                navigate('/title'); // ログイン成功後に遷移するパス
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
            setMessage('Error: ' + error.response.data.message);
            } else {
            setMessage('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="login-container">
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ユーザーネーム:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>パスワード:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Switch to Register' : 'Switch to Login'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;