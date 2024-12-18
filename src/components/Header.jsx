import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
      </Link>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        <SearchBar onSearch={handleSearch} />
        <UserMenu />
      </div>
    </header>
  );
}

export default Header;