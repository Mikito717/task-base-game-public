import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import './Coding.css';

const Coding = () => {
    const [code, setCode] = useState(``);
    const [llmQuery, setLlmQuery] = useState('');
    const [llmResponse, setLlmResponse] = useState('');
    const [llmHistory, setLlmHistory] = useState([]);
    const [codeOutput, setCodeOutput] = useState(''); // 新しい状態を追加
    const [hintVisible, setHintVisible] = useState(false); // ヒントの表示状態を追加
    const navigate = useNavigate();
    const url = `${process.env.REACT_APP_NGROK_URL}`;
    const user = localStorage.getItem('user');

    useEffect(() => {
        const savedCode = localStorage.getItem('code');
        if (savedCode) {
            setCode(savedCode);
        }
        handleFlaskCommunication();
    }, []);

    const handleCodeChange = (newValue) => {
        setCode(newValue);
        localStorage.setItem('code', newValue);
    };

    const handleSubmit = async() => {
        try {
            const response = await axios.post(`${url}/code_submit`, { user, code });
            setCodeOutput(response.data.output); // アウトプットを状態に設定
        } catch (error) {
            console.error('Error submitting code:', error);
        }
        // Show a snackbar notification
        const snackbar = document.createElement('div');
        snackbar.className = 'snackbar';
        snackbar.innerText = 'Code submitted successfully!';
        document.body.appendChild(snackbar);

        // Remove the snackbar after 3 seconds
        setTimeout(() => {
            document.body.removeChild(snackbar);
        }, 3000);
        // Handle code submission logic here
    };

    const handleRunCode = async () => {
        try {
            const response = await axios.post(`${url}/run`, { user, code });
            setCodeOutput(response.data.output); // アウトプットを状態に設定
        } catch (error) {
        }
    };

    const handleLlmSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/chat`, { user, prompt: llmQuery });
            const newEntry = { query: llmQuery, response: response.data.response };

            // 正しい順序で履歴を更新
            setLlmHistory((prevHistory) => [...prevHistory, newEntry]);
            setLlmResponse(response.data.response);
        } catch (error) {
        }

        // 入力欄をリセット
        setLlmQuery('');
    };

    const handleFlaskCommunication = async () => {
        try {
            const response = await axios.post(`${url}/get_progress`,
                { user },
                { headers: { 'Content-Type': 'application/json' } });
            localStorage.setItem('progress', response.data.progress);
        } catch (error) {
            console.error('Error communicating with Flask:', error);
        }
    };

    const toggleHint = () => {
        setHintVisible(!hintVisible);
    };
    const hint = `トレーニングCSVファイルの名前は
'${localStorage.getItem('progress')}.csv'
です。カレントディレクトリに存在します。提出はsubmissionディレクトリにお願いします。
なお、ディレクトリ構成は
- submission
-> train(カレントディレクトリ)
    -${localStorage.getItem('progress')}.csv
- val
    -${localStorage.getItem('progress')}.csv
となっています。実際に予測してもらうデータはvalディレクトリに入った${localStorage.getItem('progress')}.csvです。
また、提出するファイル名は
'${localStorage.getItem('progress')}.csv'
のままで構いません。
目的変数はtaegetです。
予測結果の保存、提出法は
# 予測結果を新しいCSVファイルに保存
output_df = pd.DataFrame({'target': pred})

# 予測結果をCSVファイルに保存
output_df.to_csv('../submission/${localStorage.getItem('progress')}.csv', index=False)
となります。
`;
                
    return (
        <>
        <div className="coding-container">
            <div className="coding-editor">
                <MonacoEditor
                    width="75vw"
                    height="75vh"
                    language="python"
                    theme="vs-dark"
                    value={code}
                    onChange={handleCodeChange}
                    editorDidMount={(editor) => editor.focus()}
                />
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={handleSubmit} style={{marginLeft:'20px'}}>Submit Code</button>
                <button onClick={handleRunCode} style={{marginLeft:'20px'}}>Run Code</button>
                <button onClick={toggleHint} style={{marginLeft:'20px'}}>ヒント</button>
                {hintVisible && <pre>{hint}</pre>}
                <div className="coding-console">
                    <h3>Code Output:</h3>
                    <pre>{codeOutput}</pre> {/* アウトプットを表示 */}
                </div>
                
            </div>
            <div className="coding-chat">
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
                <div className="coding-chat-history">
                    <h2 className="coding-h2">Chat with LLM</h2>
                    <div>
                        {llmHistory.slice(0).reverse().map((entry, index) => (
                            <div key={index} className="coding-div">
                                <strong className="coding-strong">Query:</strong> <ReactMarkdown>{entry.query}</ReactMarkdown>
                                <strong className="coding-strong">Response:</strong> <ReactMarkdown>{entry.response}</ReactMarkdown>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Coding;