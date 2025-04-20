import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/Auth/SignIn/SignIn';
import ChatBot from './pages/ChatBot/ChatBot';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/chatbot" element={<ChatBot />} />
      </Routes>
    </Router>
  );
}

export default App;
