import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Radar } from 'react-chartjs-2';
import 'chart.js/auto';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [progress, setProgress] = useState(0);
  const [comment, setComment] = useState('');
  const [studyTime, setStudyTime] = useState(0);
  const [weaknessData, setWeaknessData] = useState([80, 60, 40, 20, 10,0]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_NGROK_URL}`;

    useEffect(() => {
        const fetchTaskData = async () => {
            try {
                const response = await fetch(url +'/get_userdata', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ user:localStorage.getItem('user') }),
                });
                const data = await response.json();
                setProgress(data.progress);
                setComment(data.answer);
                setWeaknessData(data.average_scores);
            } catch (error) {
                console.error('Error fetching task data:', error);
            }
        };

        fetchTaskData();
    }, [ url]);

  const radarData = {
    labels: ["1:AIの精度",
            "2:コーディング\nの綺麗さ",
            "3:解決策の\n再現性",
            "4:解決策の実行可能性",
            "5:解決策に対する\n説明可能性",
            "6:選択したAIの妥当性"],
    datasets: [
      {
        label: 'Weakness Analysis',
        data: weaknessData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        angleLines: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">学習状況</h1>
      {error && <p className="profile-error">{error}</p>}
      <div className="profile-progress">
        <h2>全体の学習進捗</h2>
        <p>{progress}個のタスクを解決した！</p>
      </div>
      <div className="profile-comment">
        <h2>コメント</h2>
        <p>{comment}</p>
      </div>
      <div className="profile-radar-chart">
        <h2>弱点分析(高得点が強み）</h2>
        <Radar data={radarData} options={radarOptions} />
      </div>
      <button onClick={() => navigate(-1)} className="back-button">戻る</button>
    </div>
  );
};

export default Profile;