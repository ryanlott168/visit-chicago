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
      <header>
        <h1 className="site-title">
          <span className="flag-star">✶</span>
          <span className="flag-star">✶</span>
          Chicago Guide
          <span className="flag-star">✶</span>
          <span className="flag-star">✶</span>
        </h1>
        <nav className="nav">
          <button
            className={page === 'home' ? 'active' : ''}
            onClick={() => setPage('home')}
          >
            Home
          </button>
          <button
            className={page === 'restaurants' ? 'active' : ''}
            onClick={() => setPage('restaurants')}
          >
            Food
          </button>
          <button
            className={page === 'sites' ? 'active' : ''}
            onClick={() => setPage('sites')}
          >
            Attractions
          </button>
          <button
            className={page === 'nightlife' ? 'active' : ''}
            onClick={() => setPage('nightlife')}
          >
            Nightlife
          </button>
          <button
            className={page === 'facts' ? 'active' : ''}
            onClick={() => setPage('facts')}
          >
            City Facts
          </button>
        </nav>
      </header>
      <main>
        <CurrentPage />
      </main>
    </div>
  );
}
