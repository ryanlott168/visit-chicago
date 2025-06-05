import React from 'react';

export default function TouristSites() {
  const sites = [
    { name: 'Millennium Park', desc: 'Home of the famous “Bean” sculpture.' },
    { name: 'Navy Pier', desc: 'Attractions, restaurants, and lakefront views.' },
    { name: 'Art Institute of Chicago', desc: 'World-class art collections.' },
  ];
  return (
    <div className="page">
      <h1>Tourist Sites</h1>
      <ul>
        {sites.map((s) => (
          <li key={s.name}>
            <strong>{s.name}</strong> - {s.desc}
          </li>
        ))}
      </ul>
    </div>
  );
}
