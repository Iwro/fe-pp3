export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
  
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  }