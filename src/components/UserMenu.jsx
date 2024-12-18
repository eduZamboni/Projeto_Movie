import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserMenu() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      navigate('/signin');
    }
  };

  return (
    <button onClick={handleClick} style={{ color: '#fff' }}>
      <img src="/user-avatar.png" alt="User" style={{ width: '30px', borderRadius: '50%' }} />
    </button>
  );
}

export default UserMenu;