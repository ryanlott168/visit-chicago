const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

async function request(path, options) {
  let res;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      ...options,
    });
  } catch (err) {
    throw new Error('Network error');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Request failed');
  }
  if (res.status === 204) return null;
  return res.json();
}

export async function adminExists() {
  try {
    const data = await request('/admin', { method: 'GET' });
    return data.exists;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function setupAdmin(user) {
  await request('/admin', {
    method: 'POST',
    body: JSON.stringify(user),
  });
}

export async function loginAdmin(username, password) {
  await request('/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function resetAdminPassword(email) {
  const data = await request('/reset', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });
  return data.newPassword;
}

export async function getPlaces() {
  return request('/places', { method: 'GET' });
}

export async function addPlace(place) {
  return request('/places', {
    method: 'POST',
    body: JSON.stringify(place),
  });
}
