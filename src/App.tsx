import React from 'react';
import './App.scss';

import SearchBox from './components/SearchBox';

function App() {
  return (
    <div className="home">
      <div className="container">
        <SearchBox />
      </div>
    </div>
  );
}

export default App;
