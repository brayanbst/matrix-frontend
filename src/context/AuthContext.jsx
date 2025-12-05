// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { login as apiLogin } from "../lib/apiClient";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // aquí podrías guardar username/rol si quisieras
  const [loading, setLoading] = useState(false);

  // Si quieres persistir el token entre recargas, puedes descomentar esto:
  useEffect(() => {
    const stored = window.sessionStorage.getItem("authToken");
    if (stored) {
      setToken(stored);
      setUser({ username: "admin" }); // opcional, podrías decodificar el JWT
    }
  }, []);

  useEffect(() => {
    if (token) {
      window.sessionStorage.setItem("authToken", token);
    } else {
      window.sessionStorage.removeItem("authToken");
    }
  }, [token]);

  async function login(username, password) {
    setLoading(true);
    try {
      const jwt = await apiLogin(username, password);
      setToken(jwt);
      setUser({ username });
    } finally {
      setLoading(false);
    }
  }

  function logout() {
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
