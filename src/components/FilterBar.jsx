import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';

function FilterBar({ onGenreChange }) {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
        params: {
          api_key: API_KEY,
          language: 'pt-BR'
        }
      });
      setGenres(response.data.genres);
    };
    fetchGenres();
  }, []);

  return (
    <div style={{ marginBottom: '20px' }}>
      <select onChange={(e) => onGenreChange(e.target.value)}>
        <option value="">Todos os Gêneros</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>{g.name}</option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;