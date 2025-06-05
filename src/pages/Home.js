import React from 'react';

export default function Home() {
  return (
    <div className="page">
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=60')",
        }}
      >
        <div className="hero-text">
          <h1>Welcome to Chicago</h1>
          <p>
            Explore the best restaurants, famous attractions, lively nightlife,
            and quirky facts about the Windy City.
          </p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
            alt="Chicago food"
          />
          <h2>Food</h2>
          <p>Sample iconic deep-dish pizza, hot dogs, and diverse cuisine.</p>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1486663845017-b7302c7d067d?auto=format&fit=crop&w=800&q=60"
            alt="Chicago sites"
          />
          <h2>Sites</h2>
          <p>Visit landmarks like Millennium Park and the Art Institute.</p>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1524760830983-93f53aee37b1?auto=format&fit=crop&w=800&q=60"
            alt="Chicago nightlife"
          />
          <h2>Nightlife</h2>
          <p>Experience live music, rooftop bars, and clubs after dark.</p>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1502590464430-1af6001f5212?auto=format&fit=crop&w=800&q=60"
            alt="Chicago facts"
          />
          <h2>Interesting Facts</h2>
          <p>Discover quirky trivia that makes Chicago unique.</p>
        </div>
      </div>
    </div>
  );
}
