// src/components/MatrixForm.jsx
import React, { useState } from "react";

function parseMatrix(input) {
  // Permite separar por espacios o comas, filas por saltos de línea
  const rows = input
    .trim()
    .split("\n")
    .map((row) =>
      row
        .trim()
        .split(/[,\s]+/)
        .filter((x) => x.length > 0)
        .map((v) => Number(v))
    );

  if (rows.length === 0 || rows[0].length === 0) {
    throw new Error("La matriz no puede estar vacía");
  }

  const cols = rows[0].length;
  for (const r of rows) {
    if (r.length !== cols) {
      throw new Error("Todas las filas deben tener el mismo número de columnas");
    }
    if (r.some((n) => Number.isNaN(n))) {
      throw new Error("Todos los valores deben ser números válidos");
    }
  }

  return rows;
}

export default function MatrixForm({ onSubmit, loading }) {
  const [rawMatrix, setRawMatrix] = useState("0 1\n1 1");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    try {
      const matrix = parseMatrix(rawMatrix);
      onSubmit(matrix);
    } catch (err) {
      setError(err.message || "Error al procesar la matriz");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="matrix"
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          Matriz
        </label>
        <p className="text-xs text-slate-500 mb-2">
          Escribe la matriz fila por fila. Separa los valores por espacios o
          comas, y las filas con saltos de línea. Ejemplo:
          <br />
          <code>0 1{`\n`}1 1</code>
        </p>
        <textarea
          id="matrix"
          rows={4}
          value={rawMatrix}
          onChange={(e) => setRawMatrix(e.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-md bg-indigo-600 border border-indigo-700 px-4 py-2 text-sm font-medium text-white ..."
        >
        {loading ? "Calculando..." : "Calcular QR + Stats"}
        </button>
    </form>
  );
}
