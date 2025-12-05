// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ username: "admin", password: "secret" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form.username, form.password);
    } catch (err) {
      setError(err.message || "Error en el login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      {/* Fondo con gradiente suave */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-slate-900 to-slate-950 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Tarjeta principal */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-2xl px-8 py-9">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center">
              <span className="text-indigo-300 text-lg font-bold">M</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-50">
                Matrix Service
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">
                Panel de prueba · QR + estadísticas
              </p>
            </div>
          </div>

          <h2 className="text-base font-medium text-slate-100 mb-1">
            Iniciar sesión
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            Usa las credenciales de demo:{" "}
            <span className="font-mono text-[11px] bg-slate-800/80 px-1.5 py-0.5 rounded-md">
              admin / secret
            </span>
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/40 px-3 py-2 text-xs text-red-200">
              {error}
            </div>
          )}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Usuario
              </label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                type="text"
                autoComplete="username"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-300 mb-1.5"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                autoComplete="current-password"
                className="w-full rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full inline-flex justify-center items-center rounded-lg bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/30 hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>

          <p className="mt-5 text-[11px] text-slate-500 text-center">
            Esta aplicación consume tu API Go en Heroku para autenticar
            y calcular la descomposición QR + estadísticas en Node.
          </p>
        </div>
      </div>
    </div>
  );
}
