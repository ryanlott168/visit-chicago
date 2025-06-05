import React, { useState } from 'react';
import { addPlace } from '../utils/api';

export default function AddPlace() {
  const [search, setSearch] = useState('');
  const [name, setName] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [details, setDetails] = useState('');
  const [rating, setRating] = useState('');
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    const key = process.env.REACT_APP_GOOGLE_MAPS_KEY;
    if (!search || !key) return;
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(search)}&key=${key}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.results && data.results[0]) {
        const r = data.results[0];
        setName(r.formatted_address);
        setLat(r.geometry.location.lat);
        setLng(r.geometry.location.lng);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPlace({ name, lat: parseFloat(lat), lng: parseFloat(lng), details, rating: parseFloat(rating) });
      setMessage('Place saved');
      setName('');
      setLat('');
      setLng('');
      setDetails('');
      setRating('');
    } catch (err) {
      setMessage('Error saving');
    }
  };

  return (
    <div className="page">
      <h1>Add Place</h1>
      <div className="login-form">
        <div style={{ display: 'flex', gap: '10px' }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search address" />
          <button type="button" onClick={handleSearch}>Lookup</button>
        </div>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={lat} onChange={(e) => setLat(e.target.value)} placeholder="Latitude" />
        <input value={lng} onChange={(e) => setLng(e.target.value)} placeholder="Longitude" />
        <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Details" />
        <input value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating" />
        <button onClick={handleSubmit}>Save</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}
