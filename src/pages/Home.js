import React from 'react';

export default function Home() {
  return (
    <div className="page">
      <div
        className="hero-section"
        style={{
          backgroundImage:
            "url('https://b777290.smushcdn.com/777290/wp-content/uploads/2020/08/iStock-1141114423-scaled.jpg?lossy=1&strip=1&webp=1')",
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
          <div className="card-text">
            <h2>Food</h2>
            <p>Sample iconic deep-dish pizza, hot dogs, and diverse cuisine.</p>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
            alt="Chicago sites"
          />
          <div className="card-text">
            <h2>Sites</h2>
            <p>Visit landmarks like Millennium Park and the Art Institute.</p>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
            alt="Chicago nightlife"
          />
          <div className="card-text">
            <h2>Nightlife</h2>
            <p>Experience live music, rooftop bars, and clubs after dark.</p>
          </div>
        </div>

        <div className="card">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=60"
            alt="Chicago facts"
          />
          <div className="card-text">
            <h2>Interesting Facts</h2>
            <p>Discover quirky trivia that makes Chicago unique.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
