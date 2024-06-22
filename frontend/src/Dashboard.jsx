

import React from 'react';
import { useAuth } from './middleware';

const Dashboard = () => {
  useAuth();  // Middleware kullanmaya olanak tanır!

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bu, sadece giriş yapmış kullanıcılar tarafından görülebilir.</p>
    </div>
  );
};

export default Dashboard;
