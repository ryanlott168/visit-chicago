import React, { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import TouristSites from './pages/TouristSites';
import Nightlife from './pages/Nightlife';
import InterestingFacts from './pages/InterestingFacts';

const pages = {
  home: Home,
  restaurants: Restaurants,
  sites: TouristSites,
  nightlife: Nightlife,
  facts: InterestingFacts,
};

export default function App() {
  const [page, setPage] = useState('home');
  const CurrentPage = pages[page];

  return (
    <div className="App">
      <nav className="nav">
        <button onClick={() => setPage('home')}>Home</button>
        <button onClick={() => setPage('restaurants')}>Restaurants</button>
        <button onClick={() => setPage('sites')}>Tourist Sites</button>
        <button onClick={() => setPage('nightlife')}>Nightlife</button>
        <button onClick={() => setPage('facts')}>Interesting Facts</button>
      </nav>
      <main>
        <CurrentPage />
      </main>
    </div>
  );
}
