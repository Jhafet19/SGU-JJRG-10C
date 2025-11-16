const ENV = import.meta.env;

const API_URL = `${ENV.VITE_API_PROTOCOL}://${ENV.VITE_API_HOST}:${ENV.VITE_API_PORT}${ENV.VITE_API_BASE}`;

export async function findAllUsers() {
    const res = await fetch(`${API_URL}`, { method: "GET" });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.text || `HTTP ${res.status}`);
    return Array.isArray(data?.result) ? data.result : [];
}

export async function findUserById(id) {
    const res = await fetch(`${API_URL}/${id}`, {method: "GET"});
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
    return data;
}

export async function createUser(dto) {
    const res = await fetch(`${API_URL}/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dto),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
    return data;
}

export async function updateUser(dto) {
    const res = await fetch(`${API_URL}/`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dto),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
    return data;
}

export async function deleteUser(dto) {
    const res = await fetch(`${API_URL}/`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dto),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.message || `HTTP ${res.status}`);
    return data;
}

export {API_URL};