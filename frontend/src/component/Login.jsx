


import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../auth'; // Gerçek login fonksiyonunuzun import yolunu kullanın

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Yanıt JSON formatında mı kontrol et
      if (!response.ok) {
        // Başarısız yanıt
        const errorData = await response.json();
        throw new Error(`HTTP hatası ${response.status}: ${errorData}`);
      }

      const data = await response.json(); // JSON yanıtı işleyelim

      // Varsayılan olarak 'data' içinde bir token olduğunu varsayalım
      login(data.token); // Login fonksiyonu ile token'i sakladığımızı varsayalım
      navigate(from); // Önceki sayfaya veya dashboard'a yönlendirme yapalım
    } catch (error) {
      // console.error('Hata:', error); //consola yazdırmak istemezsem  bunu yorums satırı yapmalıyım.
      setResponseMessage(` ${error.message}`);
    }
  };

  return (
    <div>
      <form className="form h-92 w-80" onSubmit={handleSubmit}>
        <div className="title">
          Welcome,<br />
          <span>login up to continue</span>
        </div>
        <input
          className="input"
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="input"
          id="password"
          name="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="button-confirm">
        Let`s go →
        </button>
      </form>
      <div>
        {responseMessage}
      </div>
    </div>
  );
};

export default LoginPage;
