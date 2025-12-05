// src/lib/apiClient.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Wrapper seguro sobre fetch:
 * - Incluye JWT si se le pasa.
 * - Maneja JSON y errores de forma consistente.
 */
export async function apiRequest(path, { method = "GET", body, token } = {}) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const contentType = response.headers.get("content-type");
  let data = null;

  if (contentType && contentType.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    // devolvemos un error con el mensaje de la API si existe
    const message =
      data && typeof data === "object" && data.message
        ? data.message
        : `Request failed with status ${response.status}`;
    const err = new Error(message);
    err.status = response.status;
    err.data = data;
    throw err;
  }

  return data;
}

export async function login(username, password) {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: { username, password },
  });

  // La API devuelve { code, message, data: { token } }
  if (data.code !== "000" || !data.data?.token) {
    throw new Error(data.message || "Login failed");
  }

  return data.data.token;
}

export async function computeQrAndStats(matrix, token) {
  const data = await apiRequest("/api/qr-and-stats", {
    method: "POST",
    body: { matrix },
    token,
  });

  if (data.code !== "000") {
    throw new Error(data.message || "Error computing QR and stats");
  }

  return data.data; // { Q, R, stats }
}
