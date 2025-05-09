import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

// Get API URL from environment variables (Vite example)
const API_BASE_URL =  'http://localhost:3000/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('authToken'));
  const [isLoading, setIsLoading] = useState(true); // For initial auth check & login process

  // Function to set token in state, localStorage, and axios defaults
  const saveTokenAndUser = useCallback((newToken, userData) => {
    setToken(newToken);
    setCurrentUser(userData);
    if (newToken) {
      localStorage.setItem('authToken', newToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    } else {
      localStorage.removeItem('authToken');
      delete axios.defaults.headers.common['Authorization'];
    }
  }, []);

  // Function to fetch current user if token exists
  const fetchCurrentUser = useCallback(async (currentToken) => {
    if (!currentToken) {
      saveTokenAndUser(null, null);
      setIsLoading(false);
      return;
    }
    // Ensure token is set for this specific request if not already default
    axios.defaults.headers.common['Authorization'] = `Bearer ${currentToken}`;
    try {
      const response = await axios.get(`${API_BASE_URL}/users/me`);
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Failed to fetch current user, token might be invalid:", error.response?.data?.message || error.message);
      saveTokenAndUser(null, null); // Clear invalid token and user
    } finally {
      setIsLoading(false);
    }
  }, [saveTokenAndUser]);

  // Check for existing token on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      fetchCurrentUser(storedToken);
    } else {
      setIsLoading(false); // No token, not loading
    }
  }, [fetchCurrentUser]);

  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
      const { token: newToken, user: userData } = response.data;
      saveTokenAndUser(newToken, userData);
      setIsLoading(false);
      toast.success('Logged in successfully!');
      return userData; 
    } catch (error) {
      setIsLoading(false);
      const errorMessage = error.response?.data?.message || 'Login failed. Please check credentials.';
      console.error("Login failed:", errorMessage);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const logout = useCallback(() => {
    saveTokenAndUser(null, null);
    toast.success('Logged out successfully!');
    // Navigation to /login will be handled by ProtectedRoute or component calling logout
  }, [saveTokenAndUser]);

  return (
    <AuthContext.Provider value={{ currentUser, token, isAuthenticated: !!currentUser, isLoading, login, logout, fetchCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
