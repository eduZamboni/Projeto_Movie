import React, { useState } from 'react';
import styles from './Home.module.css';
import DecadeNavigation from '../components/DecadeNav';
import Ranking from '../components/Ranking';

function Home() {
  const [selectedDecade, setSelectedDecade] = useState(2020);

  return (
    <main className={styles.main}>
      <DecadeNavigation onDecadeChange={setSelectedDecade} selectedDecade={selectedDecade} />
      <h2 className={styles.title}>Top 10 Filmes da Década de {selectedDecade}</h2>
      <Ranking decade={selectedDecade} />
    </main>
  );
}

export default Home;