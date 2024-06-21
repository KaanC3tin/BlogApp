import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'
import Navbar  from './components/Navbar'
import Signup from './components/Signup';

const App = () => {
  return (
    <Router>
      <Navbar />  {/* Navbar bileşenini Routes bileşeninin dışına taşıyoruz */}
      <Routes>
      <Route path="/" element={<HomePage />} />
       
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />


      
      </Routes>
    </Router>
  );
};

export default App;
