import axios from "axios";

const API_BASE = "http://192.168.0.10:8080/menu"; // aca hay q cambiar la ip por el del bakend

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
export const obtenerMenusDiarios = async (fecha: string) => {
  const res = await fetch(`${API_BASE}/menuDiario/todos/${fecha}`);
  if (!res.ok) throw new Error('Error al obtener los menús diarios');
  return await res.json();
};

export const agregarMenuDiario = async (menuDiarioData: { idMenu: number, fecha: string }) => {
  const res = await fetch(`${API_BASE}/menuDiario/agregar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menuDiarioData),
  });
  if (!res.ok) throw new Error('Error al agregar menú diario');
};

export const agregarVariosMenusDiarios = async (menusDiarios: { idMenu: number, fecha: string }[]) => {
  const res = await fetch(`${API_BASE}/menuDiario/agregarVarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(menusDiarios),
  });
  if (!res.ok) throw new Error('Error al agregar varios menús diarios');
};
