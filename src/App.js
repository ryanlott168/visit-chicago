import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import TouristSites from './pages/TouristSites';
import Nightlife from './pages/Nightlife';
import InterestingFacts from './pages/InterestingFacts';
import AdminLogin from './pages/AdminLogin';
import AdminSetup from './pages/AdminSetup';
import ResetPassword from './pages/ResetPassword';
import { adminExists as checkAdminExists } from './utils/api';

const pages = {
  home: Home,
  restaurants: Restaurants,
  sites: TouristSites,
  nightlife: Nightlife,
  facts: InterestingFacts,
};

export default function App() {
  const [page, setPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(
    () => localStorage.getItem('isAdmin') === 'true'
  );
  const [adminExistsState, setAdminExistsState] = useState(null);
  const CurrentPage = pages[page];

  useEffect(() => {
    async function check() {
      const exists = await checkAdminExists();
      setAdminExistsState(exists);
    }
    check();
  }, []);

  useEffect(() => {
    // keep path consistent after sign in/out
    if (!isAdmin && window.location.pathname === '/admin') {
      // stay on /admin to show login
    } else if (isAdmin && window.location.pathname === '/admin') {
      // admin mode stays on /admin
    }
  }, [isAdmin]);

  if (window.location.pathname.startsWith('/admin') && !isAdmin) {
    if (adminExistsState === null) {
      return <p>Loading...</p>;
    }
    if (!adminExistsState) {
      return (
        <AdminSetup
          onSetup={() => {
            setIsAdmin(true);
            window.history.pushState(null, '', '/admin');
          }}
        />
      );
    }
    if (window.location.pathname === '/admin/reset') {
      return <ResetPassword />;
    }
    return <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

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
        {/* pass setPage to allow Home cards to navigate */}
        <CurrentPage setPage={setPage} />
      </main>
      {isAdmin && (
        <div className="admin-badge">
          Admin
          <button className="signout" onClick={() => {
            localStorage.removeItem('isAdmin');
            setIsAdmin(false);
            window.history.pushState(null, '', '/');
          }}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
