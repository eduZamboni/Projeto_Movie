import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';
import { motion } from 'framer-motion';

function MovieCard({ movie }) {
  const { id, title, poster_path } = movie;

  return (
    <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
      <Link to={`/details/${id}`}>
        <div className={styles.posterWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w200${poster_path}`}
            alt={title}
            className={styles.poster}
          />
        </div>
      </Link>
    </motion.div>
  );
}

export default MovieCard;