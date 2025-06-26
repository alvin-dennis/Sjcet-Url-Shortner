// API utility functions
const API_BASE = 'http://localhost:3000';

export const authAPI = {
     async login(credentials) {
          const response = await fetch(`${API_BASE}/auth/login`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(credentials)
          });

          const data = await response.json();

          if (!response.ok) {
               throw new Error(data.error || 'Login failed');
          }

          return data;
     },

     async signup(userData) {
          const response = await fetch(`${API_BASE}/auth/signup`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(userData)
          });

          const data = await response.json();

          if (!response.ok) {
               throw new Error(data.error || 'Signup failed');
          }

          return data;
     }
};