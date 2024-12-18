import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginRight: '10px' }}>
      <input
        type="text"
        placeholder="Buscar título..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ padding: '5px' }}
      />
      <button type="submit" style={{ color: '#fff', background: '#E50914', marginLeft: '5px', padding: '5px' }}>Buscar</button>
    </form>
  );
}

export default SearchBar;