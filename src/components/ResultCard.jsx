// src/components/ResultCard.jsx
import React from "react";

function MatrixTable({ title, matrix }) {
  if (!matrix || matrix.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-700 mb-1">{title}</h3>
      <div className="overflow-x-auto rounded-md border border-slate-200 bg-white">
        <table className="min-w-full text-xs text-right">
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i} className="border-b last:border-b-0 border-slate-100">
                {row.map((value, j) => (
                  <td key={j} className="px-2 py-1 font-mono text-slate-800">
                    {Number(value).toFixed(4)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ResultCard({ result }) {
  if (!result) return null;

  const { Q, R, stats } = result;

  return (
    <div className="mt-6 grid gap-6 md:grid-cols-2">
      <div className="space-y-4">
        <MatrixTable title="Matriz Q" matrix={Q} />
        <MatrixTable title="Matriz R" matrix={R} />
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-slate-700">Estadísticas</h3>
        <div className="rounded-md border border-slate-200 bg-white p-4 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-slate-500">Máximo:</span>
            <span className="font-mono">{stats.maxValue}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-500">Mínimo:</span>
            <span className="font-mono">{stats.minValue}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-500">Promedio:</span>
            <span className="font-mono">{stats.average}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-500">Suma total:</span>
            <span className="font-mono">{stats.totalSum}</span>
          </div>
          <div className="mt-3">
            <span className="text-slate-500 text-xs block mb-1">
              ¿Matrices diagonales? (Q, R, ...)
            </span>
            <div className="inline-flex flex-wrap gap-2">
              {stats.diagonals?.map((flag, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-1 rounded-full text-xs ${
                    flag
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-slate-50 text-slate-700 border border-slate-100"
                  }`}
                >
                  {flag ? "Diagonal" : "No diagonal"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
