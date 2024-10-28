import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
  const { id, title, poster_path, vote_average } = movie;

  return (
    <div className={styles.card}>
      <Link to={`/details/${id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w200${poster_path}`}
          alt={title}
          className={styles.poster}
        />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.rating}>Nota: {vote_average}</p>
      </Link>
    </div>
  );
}

export default MovieCard;