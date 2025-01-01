import React, { useState, useEffect } from 'react';
import './feedback.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Feedback = () => {
    const [mlResult, setMlResult] = useState('');
    const [evaluation, setEvaluation] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setMlResult(location.state.acc);
        setEvaluation(location.state.eval_by_llm);
    }, [location.state]);

    const handleNext = () => {
        navigate('/result', { state: { acc: mlResult, eval:evaluation } });

        // Handle next button click
        console.log('Next button clicked');
    };

    const handleBack = () => {
        navigate(-1);
        // Handle back button click
        console.log('Back button clicked');
    };

    return (
        <div className="feedback-div">
            <h2 className="feedback-h2">Machine Learning Result</h2>
            <pre className="feedback-p">{JSON.stringify(mlResult, null, 2)}</pre>

            <h2 className="feedback-h2">LLM Comment</h2>
            <p className="feedback-p">{evaluation.feedback}</p>


            <button className="feedback-button" onClick={handleBack}>Back</button>
            <button className="feedback-button" onClick={handleNext}>Next</button>
        </div>
    );
};

export default Feedback;