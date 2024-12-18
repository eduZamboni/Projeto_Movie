import React, { useState } from 'react';
import styles from './Home.module.css';
import DecadeNavigation from '../components/DecadeNav';
import Ranking from '../components/Ranking';
import FilterBar from '../components/FilterBar';
import { useLocation } from 'react-router-dom';
import FramerWrapper from '../components/FramerWrapper';

function Home() {
  const [selectedDecadeLeft, setSelectedDecadeLeft] = useState(2020);
  const [selectedDecadeRight, setSelectedDecadeRight] = useState(2010);

  const [selectedGenreLeft, setSelectedGenreLeft] = useState('');
  const [selectedGenreRight, setSelectedGenreRight] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('search') || '';

  return (
    <FramerWrapper>
      <main className={styles.main}>
        <h2 className={styles.title}>Comparação de Décadas</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1 }}>
            <DecadeNavigation onDecadeChange={setSelectedDecadeLeft} selectedDecade={selectedDecadeLeft} />
            <FilterBar onGenreChange={setSelectedGenreLeft} />
            <h3>Top 10 Filmes da Década de {selectedDecadeLeft}</h3>
            <Ranking decade={selectedDecadeLeft} genre={selectedGenreLeft} query={query} />
          </div>

          <div style={{ flex: 1 }}>
            <DecadeNavigation onDecadeChange={setSelectedDecadeRight} selectedDecade={selectedDecadeRight} />
            <FilterBar onGenreChange={setSelectedGenreRight} />
            <h3>Top 10 Filmes da Década de {selectedDecadeRight}</h3>
            <Ranking decade={selectedDecadeRight} genre={selectedGenreRight} query={query} />
          </div>
        </div>
      </main>
    </FramerWrapper>
  );
}

export default Home;