import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getPlaces } from '../utils/api';

// fix default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

function MapEvents({ onBoundsChange }) {
  const map = useMapEvents({
    moveend() {
      onBoundsChange(map.getBounds());
    },
  });
  useEffect(() => {
    onBoundsChange(map.getBounds());
  }, [map, onBoundsChange]);
  return null;
}

export default function Restaurants() {
  const defaultCenter = [41.883, -87.632];
  const [center, setCenter] = useState(defaultCenter);
  const [places, setPlaces] = useState([]);
  const [visible, setVisible] = useState([]);
  const [focused, setFocused] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    getPlaces().then(setPlaces).catch(() => {});
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCenter([pos.coords.latitude, pos.coords.longitude]),
        () => {}
      );
    }
  }, []);

  const handleBoundsChange = (bounds) => {
    const vis = places.filter((p) => bounds.contains([p.lat, p.lng]));
    setVisible(vis);
  };

  const handleSelect = (p) => {
    setFocused(p);
    mapRef.current && mapRef.current.flyTo([p.lat, p.lng], 15);
  };

  return (
    <div className="food-container">
      <div className="food-map">
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: '80vh', width: '100%' }}
          whenCreated={(map) => (mapRef.current = map)}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          {places.map((p) => (
            <Marker key={p.id} position={[p.lat, p.lng]} eventHandlers={{ click: () => handleSelect(p) }}>
              <Popup>{p.name}</Popup>
            </Marker>
          ))}
          <MapEvents onBoundsChange={handleBoundsChange} />
        </MapContainer>
      </div>
      <div className="food-info">
        {!focused && (
          <ul>
            {visible.map((p) => (
              <li key={p.id} onClick={() => handleSelect(p)} style={{ cursor: 'pointer' }}>
                <strong>{p.name}</strong> - {p.details}
              </li>
            ))}
          </ul>
        )}
        {focused && (
          <div>
            <button onClick={() => setFocused(null)}>Back</button>
            <h2>{focused.name}</h2>
            <p>{focused.details}</p>
            {focused.rating && <p>Rating: {focused.rating}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
