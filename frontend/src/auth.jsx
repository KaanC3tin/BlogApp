// auth.js

// Kullanıcının giriş yapıp yapmadığını kontrol eder.
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null;
  };
  
  // Kullanıcıyı giriş yaptırır ve token'ı localStorage'a kaydeder.
  export const login = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Kullanıcıyı çıkış yaptırır ve token'ı localStorage'dan siler.
  export const logout = () => {
    localStorage.removeItem('token');
  };
  