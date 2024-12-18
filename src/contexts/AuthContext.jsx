import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: (email, password) => {},
  logout: () => {},
  signup: (email, password) => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ email: token }); 
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const stored = localStorage.getItem('users');
    let users = stored ? JSON.parse(stored) : [];
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      localStorage.setItem('token', email);
      setUser({ email });
      return true;
    }
    return false;
  };

  const signup = (email, password) => {
    const stored = localStorage.getItem('users');
    let users = stored ? JSON.parse(stored) : [];
    const exists = users.find(u => u.email === email);
    if (exists) {
      return false; 
    }
    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('token', email);
    setUser({ email });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);