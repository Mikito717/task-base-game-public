import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import {
    Chart,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
} from 'chart.js';
import { useNavigate,useLocation } from 'react-router-dom';
import './Result.css'; // CSSファイルをインポート

// 必要なコンポーネントを登録
Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const Result = () => {
    const [accuracy, setAccuracy] = useState(null);
    const location = useLocation();
    const [evaluation, setEvaluation] = useState(null); // 初期値をnullに変更
    useEffect(() => {
        setAccuracy(location.state.acc);
        setEvaluation(location.state.eval);
        console.log(location.state.eval);
    }, [location.state]);

    const [chartData, setChartData] = useState({
        labels: ["1:AIの精度",
            "2:コーディング\nの綺麗さ",
            "3:解決策の\n再現性",
            "4:解決策の実行可能性",
            "5:解決策に対する\n説明可能性",
            "6:選択したAIの妥当性"],
        datasets: [{
            label: 'Performance',
            data: [], // 初期値を空の配列に設定
            backgroundColor: 'rgba(34, 202, 236, .2)',
            borderColor: 'rgba(34, 202, 236, 1)',
            borderWidth: 1
        }]
    });

    useEffect(() => {
        if (evaluation) {
            setChartData(prevData => ({
                ...prevData,
                datasets: [{
                    ...prevData.datasets[0],
                    data: evaluation.scores
                }]
            }));
        };
    }, [evaluation]);

    const navigate = useNavigate();



    const options = {
        scales: {
            r: {
                pointLabels: {
                    font: {
                        size: 30 // ここでフォントサイズを設定
                    },
                    callback: function(value) {
                        return value.split("\n");
                    }
                },
                ticks: {
                    font: {
                        size: 20 // ここで等高線の数字のフォントサイズを設定
                    }
                }
            }
        },
        layout: {
            padding: {
                top: 20,
                bottom: 20,
                left: 20,
                right: 20
            }
        }
    };

    return (
        <div className="result-container">
            <h1>Result</h1>
            <h2>次のステップ</h2>
            <div className="next-step-box">
                {evaluation ? (
                    <p style={{marginBottom:20}}>{evaluation.next_learning}</p>
                ) : (
                    <p style={{marginBottom:20}}>次のステップの情報がありません。</p>
                )}
            </div>
            {accuracy?.accuracy !== undefined ? (
                <p>Accuracy: {accuracy.accuracy*100}%</p>
            ) : (
                <p>Mean Squared Error: {accuracy?.mse}</p>
            )}
            <p>Evaluate Solution</p>
            <Radar data={chartData} options={options} />
            <button onClick={() => navigate('/submit-solution')} style={{marginBottom:30}}>Retry to Tuning</button>
            <button onClick={() => {navigate('/menu-ai'); 
            }}>Go to Main Menu</button>
        </div>
    );
};

export default Result;
