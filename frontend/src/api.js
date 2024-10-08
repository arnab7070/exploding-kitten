const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://exploding-kitten-pearl.vercel.app/api'  // Vercel backend URL
  : 'http://localhost:8080/api';  // Local development URL


export const fetchLeaderboard = async () => {
  const response = await fetch(`${API_BASE_URL}/leaderboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  return response.json();
};

export const updateScore = async (username, points) => {
  const response = await fetch(`${API_BASE_URL}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, points }),
  });
  if (!response.ok) {
    throw new Error('Failed to update score');
  }
};

export const saveGame = async (gameState) => {
  const response = await fetch(`${API_BASE_URL}/save`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(gameState),
  });
  if (!response.ok) {
    throw new Error('Failed to save game');
  }
};

export const loadGame = async (username) => {
  const response = await fetch(`${API_BASE_URL}/load?username=${username}`);
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Failed to load game');
  }
  return response.json();
};
