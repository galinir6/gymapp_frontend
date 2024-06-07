import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information when accessToken changes
    if (accessToken) {
      fetchUser();
    }
  }, [accessToken]);

  const saveToken = (token) => {
    setAccessToken(token);
  };

  const fetchUser = async () => {
    try {
      const response = await fetch('http://10.100.102.35:5000/api/auth/user', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user:', error);
      // Handle error: Display error message, logout user, etc.
    }
  };

  return (
    <AuthContext.Provider value={{ accessToken, user, saveToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
