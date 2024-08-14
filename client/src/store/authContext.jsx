import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const AuthContext = createContext({
  user: {},
  saveUser: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const saveUser = useCallback((data) => {
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          user,
          saveUser,
          logout,
        }),
        [user, saveUser, logout]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
}
