import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("mh_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("mh_users") || "[]");
    const exists = users.find((u) => u.email === email);
    if (exists) throw new Error("Email already registered");
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("mh_users", JSON.stringify(users));
    const sessionUser = { name, email };
    localStorage.setItem("mh_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("mh_users") || "[]");
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid email or password");
    const sessionUser = { name: found.name, email: found.email };
    localStorage.setItem("mh_user", JSON.stringify(sessionUser));
    setUser(sessionUser);
  };

  const logout = () => {
    localStorage.removeItem("mh_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
