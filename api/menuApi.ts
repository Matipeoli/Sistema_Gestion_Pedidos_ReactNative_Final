import axios from "axios";

const API_BASE = "http://192.168.0.10:8080/menu"; // ⚠️ Cambiá la IP por la de tu backend

export const obtenerMenus = async () => {
  const res = await axios.get(`${API_BASE}/todos`);
  return res.data;
};

export const obtenerMenuPorId = async (id: number) => {
  const res = await axios.get(`${API_BASE}/obtener/${id}`);
  return res.data;
};

export const crearMenu = async (menu: any) => {
  await axios.post(`${API_BASE}/save`, menu);
};

export const editarMenu = async (menu: any) => {
  await axios.put(`${API_BASE}/edit`, menu);
};

export const eliminarMenu = async (id: number) => {
  await axios.delete(`${API_BASE}/delete/${id}`);
};
