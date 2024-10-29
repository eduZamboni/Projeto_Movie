import styles from './DecadeNav.module.css';

function DecadeNavigation({ onDecadeChange, selectedDecade }) {
  const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

  return (
    <div className={styles.navigation}>
      {decades.map((decade) => (
        <button
          key={decade}
          className={`${styles.button} ${selectedDecade === decade ? styles.active : ''}`}
          onClick={() => onDecadeChange(decade)}
        >
          {decade}s
        </button>
      ))}
    </div>
  );
}

export default DecadeNavigation;