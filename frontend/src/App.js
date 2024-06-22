import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home'
import Navbar  from './components/Navbar'
import Signup from './components/Signup';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';


const App = () => {
  return (
    <Router>
      <Navbar />  {/* Navbar bileşenini Routes bileşeninin dışına taşıyoruz çünkü her koşulda üstte gözükmesini istiyorum. */}
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute element={<Dashboard />} />}
        />
      
       </Routes>
    </Router>
  );
};

export default App;
