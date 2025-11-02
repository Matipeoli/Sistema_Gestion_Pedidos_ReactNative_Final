import axios from "axios";

const API_BASE = "http://192.168.0.10:8080";

// ====== MENÚS ======
export const obtenerMenus = async () => {
  const res = await axios.get(`${API_BASE}/menu/todos`);
  return res.data;
};

export const obtenerMenuPorId = async (id: number) => {
  const res = await axios.get(`${API_BASE}/menu/obtener/${id}`);
  return res.data;
};

export const crearMenu = async (menu: any) => {
  await axios.post(`${API_BASE}/menu/save`, menu);
};

export const editarMenu = async (menu: any) => {
  await axios.put(`${API_BASE}/menu/edit`, menu);
};

export const eliminarMenu = async (id: number) => {
  await axios.delete(`${API_BASE}/menu/delete/${id}`);
};

// ====== MENÚ DIARIO ======
export const obtenerMenusDiarios = async (fecha: string) => {
  const res = await axios.get(`${API_BASE}/menuDiario/todos/${fecha}`);
  return res.data;
};

export const agregarMenuDiario = async (menuDiarioData: { menuId: number, fecha: string }) => {
  const res = await axios.post(`${API_BASE}/menuDiario/agregar`, menuDiarioData);
  return res.data;
};

export const agregarVariosMenusDiarios = async (menusDiarios: { menuId: number, fecha: string }[]) => {
  const res = await axios.post(`${API_BASE}/menuDiario/agregarVarios`, menusDiarios);
  return res.data;
};