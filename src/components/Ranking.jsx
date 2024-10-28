import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';
import MovieCard from './MovieCard';
import styles from './Ranking.module.css';

function Ranking({ decade }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const startYear = decade;
      const endYear = decade + 9;
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie`,
          {
            params: {
              api_key: API_KEY,
              language: 'pt-BR',
              sort_by: 'vote_average.desc',
              'vote_count.gte': 1000,
              'primary_release_date.gte': `${startYear}-01-01`,
              'primary_release_date.lte': `${endYear}-12-31`,
              page: 1,
            },
          }
        );
        setMovies(response.data.results.slice(0, 10));
      } catch (error) {
        console.error('Erro ao buscar filmes:', error);
      }
    };

    fetchMovies();
  }, [decade]);

  return (
    <div className={styles.ranking}>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}

export default Ranking;