import React from 'react';
import './App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import SearchBox from './components/SearchBox';

function App() {
  return (
    <div className="home">
      <div className="container">
        <Router>
          <Routes>
            <Route path="/:city" element={<SearchBox />} />
            <Route path="/" element={<SearchBox />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
