import { useState } from 'react';
import { authAPI } from '../utils/api';

export const useAuth = () => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState('');

     const login = async (credentials) => {
          setLoading(true);
          setError('');

          try {
               const data = await authAPI.login(credentials);
               setUser(data.user);
               return { success: true };
          } catch (err) {
               setError(err.message || 'Network error. Check your connection.');
               return { success: false, error: err.message };
          } finally {
               setLoading(false);
          }
     };

     const signup = async (userData) => {
          setLoading(true);
          setError('');

          try {
               await authAPI.signup(userData);
               return { success: true };
          } catch (err) {
               setError(err.message || 'Network error. Check your connection.');
               return { success: false, error: err.message };
          } finally {
               setLoading(false);
          }
     };

     const logout = () => {
          setUser(null);
          setError('');
     };

     return {
          user,
          loading,
          error,
          login,
          signup,
          logout,
          setError
     };
};