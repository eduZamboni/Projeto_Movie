import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </Link>
    </header>
  );
}

export default Header;