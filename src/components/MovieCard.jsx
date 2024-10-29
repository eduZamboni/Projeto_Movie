import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

function MovieCard({ movie }) {
  const { id, title, poster_path } = movie;

  return (
    <div className={styles.card}>
      <Link to={`/details/${id}`}>
        <div className={styles.posterWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={title}
            className={styles.poster}
          />
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;