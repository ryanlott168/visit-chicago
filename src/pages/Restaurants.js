import React from 'react';

export default function Restaurants() {
  const places = [
    { name: 'Giordano\'s', desc: 'Classic deep dish pizza.' },
    { name: 'Portillo\'s', desc: 'Famous for Chicago-style hot dogs.' },
    { name: 'Girl & the Goat', desc: 'Trendy spot with creative small plates.' },
  ];
  return (
    <div className="page">
      <h1>Restaurants</h1>
      <ul>
        {places.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong> - {p.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}
