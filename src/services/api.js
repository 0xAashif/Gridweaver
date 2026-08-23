export const BASE_URL = 'http://localhost:8080';

export const fetchApi = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  if (response.status === 204) return null;
  
  const text = await response.text();
  return text ? JSON.parse(text) : null;
};
