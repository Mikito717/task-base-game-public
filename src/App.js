import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Title from './components/Title';
import MenuAI from './components/Menu_AI';
import TaskDetail from './components/TaskDetail';
import Solution from './components/Solution';
import Coding from './components/Coding';
import Feedback from './components/feedback';
import Result from './components/Result';
import Profile from './components/Profile';
import Login from './components/Login';
import CompleteTask from './components/Completetask';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/menu-ai" element={<MenuAI />} />
            <Route path="/task-detail" element={<TaskDetail />} />
            <Route path="/submit-solution" element={<Solution />} />
            <Route path="/coding" element={<Coding />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/result" element={<Result />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/title" element={<Title />} />
            <Route path="/complete-task" element={<CompleteTask />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
