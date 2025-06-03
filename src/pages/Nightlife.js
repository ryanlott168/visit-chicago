import React from 'react';

export default function Nightlife() {
  const spots = [
    { name: 'The Green Mill', desc: 'Historic jazz club in Uptown.' },
    { name: 'Kingston Mines', desc: 'Blues bar with live music every night.' },
    { name: 'Three Dots and a Dash', desc: 'Speakeasy-style tiki bar.' },
  ];
  return (
    <div className="page">
      <h1>Nightlife</h1>
      <ul>
        {spots.map((s) => (
          <li key={s.name}>
            <strong>{s.name}</strong> - {s.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}
