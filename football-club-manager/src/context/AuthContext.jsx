import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/axiosConfig';

const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await api.get('/auth/me');
      setUser({
        username: response.data.username,
        roles: response.data.roles,
      });
    } catch {
      setUser(null);
    }finally {
    setLoading(false);
  }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (credentials) => {
    await api.post(
      '/auth/custom-login',
      new URLSearchParams({
        username: credentials.username,
        password: credentials.password
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    await fetchUser();
  };

  const logout = async () => {
    await api.post('/../logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
