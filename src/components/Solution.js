import React, { useState, useEffect } from 'react';
import './Solution.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Solution = () => {
    const navigate = useNavigate();
    const [aiTool, setAiTool] = useState('');
    const [solutionTitle, setSolutionTitle] = useState('');
    const [solutionDetails, setSolutionDetails] = useState('');
    const [llmQuery, setLlmQuery] = useState('');
    const [llmResponse, setLlmResponse] = useState('');
    const [llmHistory, setLlmHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const url = `${process.env.REACT_APP_NGROK_URL}`;
    const user = localStorage.getItem('user');
    const location = useLocation();

    //デバッグ用
    /*    const task=({
            taskname: 'Task Name',
            taskdescription: 'Task Description',
            taskgoal: 90
        })*/
    //本番用
    const task=location.state.task;

    useEffect(() => {
        // ローカルストレージから状態を復元
        const savedSolutionTitle = localStorage.getItem('solutionTitle');
        const savedSolutionContent = localStorage.getItem('solutionContent');
        if (savedSolutionTitle) setSolutionTitle(savedSolutionTitle);
        if (savedSolutionContent) setSolutionDetails(savedSolutionContent);
    }, []);

    useEffect(() => {
        // 状態をローカルストレージに保存
        localStorage.setItem('solutionTitle', solutionTitle);
        localStorage.setItem('solutionContent', solutionDetails);
    }, [solutionTitle, solutionDetails]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const solution=`${solutionTitle}\nUsing ${aiTool}\n${solutionDetails}`;
        try{
        const response = await axios.post(url + '/submit', {
            user,solution
        });

        const eval_by_llm=response.data.evaluate_solution;
        const acc=response.data.accuracy;
        navigate('/feedback', {state: {eval_by_llm, acc}});
    }catch(error){
        console.error('Error submitting solution:', error);
        setErrorMessage('提出中にエラーが発生しました。もう一度お試しください。', error);
    }
    
    };

    const handleLlmSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url + '/chat', { user, prompt: llmQuery });
            const newEntry = { query: llmQuery, response: response.data.response };

            // 正しい順序で履歴を更新
            setLlmHistory((prevHistory) => [...prevHistory, newEntry]);
            setLlmResponse(response.data.response);
            console.log('LLM Response:', response.data.response);
        } catch (error) {
            console.error('Error fetching progress data:', error);
        }

        // 入力欄をリセット
        setLlmQuery('');
    };

    return (
        <div className="solution-page">
            <button onClick={() => navigate(-1)} className="back-button">前の画面に戻る</button>
            <div className="task-container" style={{ marginTop: 20 }}>
                <h2>{task.taskname}</h2>
                <ReactMarkdown className="llm-markdown-content">{task.taskdescription}</ReactMarkdown>
                <h2>目標精度：{task.taskgoal}%</h2>
            </div>
            <div className='right-column'>
                <div className="solution-container">
                    <h2>Submit Your AI Solution</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="solutionTitle">Solution Title</label>
                            <input
                                type="text"
                                id="solutionTitle"
                                value={solutionTitle}
                                onChange={(e) => setSolutionTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="aiTool">AI Tool</label>
                            <select
                                id="aiTool"
                                value={aiTool}
                                onChange={(e) => setAiTool(e.target.value)}
                                required
                            >
                                <option value="">Select an AI Tool</option>
                                <option value="K-NN">K-NN</option>
                                <option value="SVM">SVM</option>
                                <option value="RF">RF</option>
                                <option value="XGB">XGB</option>
                                <option value="LightGB">LightGB</option>
                                <option value="Log-Reg">Log-Reg</option>
                                <option value="K-Means">K-Means</option>
                                <option value="NN">NN</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="solutionDetails">Solution Details</label>
                            <textarea
                                id="solutionDetails"
                                value={solutionDetails}
                                onChange={(e) => setSolutionDetails(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" style={{ marginRight: 20 }}>Submit</button>
                        <button type="button" onClick={() => navigate('/coding')}>Go to Coding</button>
                    </form>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                </div>
                <div className="llm-console">
                    <h2>Consult LLM</h2>
                    <form onSubmit={handleLlmSubmit}>
                        <div className="form-group">
                            <label htmlFor="llmQuery">Your Query</label>
                            <textarea
                                id="llmQuery"
                                value={llmQuery}
                                onChange={(e) => setLlmQuery(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Submit Query</button>
                    </form>
                    <div className="llm-history">
                        <h3>LLM Chat History</h3>
                        <div className="llm-history-container">
                            {llmHistory.slice(0).reverse().map((entry, index) => (
                                <div key={index} className="llm-entry">
                                    <p><strong>Query:</strong> {entry.query}</p>
                                    <p><strong>Response:</strong> {entry.response}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Solution;