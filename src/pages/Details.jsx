import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../config';
import styles from './Details.module.css';

function Details() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            language: 'pt-BR',
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do filme:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.details}>
      <div className={styles.posterWrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.title}>{movie.title}</h2>
        <p className={styles.overview}>{movie.overview}</p>
        <p className={styles.subInfo}>
          <strong>Data de lançamento:</strong> {movie.release_date}
        </p>
        <p className={styles.subInfo}>
          <strong>Avaliação:</strong> {movie.vote_average}
        </p>
        <Link to="/" className={styles.backButton}>Voltar</Link>
      </div>
    </div>
  );
}

export default Details;