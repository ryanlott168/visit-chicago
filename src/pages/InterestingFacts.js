import React from 'react';

export default function InterestingFacts() {
  const facts = [
    'Chicago reversed the flow of its river in 1900.',
    'The first skyscraper was built here in 1885.',
    'Route 66 begins in Chicago at Grant Park.',
  ];
  return (
    <div className="page">
      <h1>Interesting Facts</h1>
      <ul>
        {facts.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
