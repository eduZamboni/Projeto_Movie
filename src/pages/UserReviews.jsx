import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function UserReviews({ movieId }) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(`reviews_${movieId}`);
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, [movieId]);

  const handleSubmit = () => {
    if (!user) {
      alert("Você precisa estar logado para enviar uma crítica.");
      return;
    }
    const newReview = {
      userId: user.email,
      content: myReview,
    };
    const updated = [...reviews, newReview];
    localStorage.setItem(`reviews_${movieId}`, JSON.stringify(updated));
    setReviews(updated);
    setMyReview('');
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Críticas dos Usuários</h3>
      {reviews.map((r, i) => (
        <div key={i} style={{ borderBottom: '1px solid #333', marginBottom: '10px', padding: '10px 0' }}>
          <p>{r.content}</p>
        </div>
      ))}
      {user && (
        <div style={{ marginTop: '10px' }}>
          <textarea value={myReview} onChange={(e) => setMyReview(e.target.value)} rows={3} style={{ width: '100%', marginBottom: '10px' }} />
          <button onClick={handleSubmit} style={{ background: '#E50914', color: '#fff', padding: '5px 10px' }}>Enviar Crítica</button>
        </div>
      )}
    </div>
  );
}

export default UserReviews;