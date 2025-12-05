// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import MatrixForm from "../components/MatrixForm";
import ResultCard from "../components/ResultCard";
import { computeQrAndStats } from "../lib/apiClient";

export default function Dashboard() {
  const { user, token, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCompute = async (matrix) => {
    setError("");
    setLoading(true);
    try {
      const data = await computeQrAndStats(matrix, token);
      setResult(data);
    } catch (err) {
      setError(err.message || "Error al calcular QR + stats");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-slate-900">
            Matrix Service Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Sesión: <span className="font-medium">{user?.username}</span>
            </span>
            <button
              onClick={logout}
              className="text-xs rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            QR + Estadísticas
          </h2>
          <MatrixForm onSubmit={handleCompute} loading={loading} />
          {error && (
            <div className="mt-4 rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <ResultCard result={result} />
        </div>
      </main>
    </div>
  );
}
