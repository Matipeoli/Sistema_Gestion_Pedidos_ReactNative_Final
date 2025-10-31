import { Request, Response } from 'express';
import { pool } from '../config/database';

export const getMenus = async (req: Request, res: Response) => {
  const [rows] = await pool.query('SELECT * FROM menus ORDER BY id');
  res.json(rows);
};

export const addMenu = async (req: Request, res: Response) => {
  const { title, description, image } = req.body;
  const [result] = await pool.query('INSERT INTO menus (title, description, image) VALUES (?, ?, ?)', [title, description, image]);
  res.json({ id: (result as any).insertId, title, description, image });
};

export const editMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, image } = req.body;
  await pool.query('UPDATE menus SET title=?, description=?, image=? WHERE id=?', [title, description, image, id]);
  res.json({ id, title, description, image });
};

export const deleteMenu = async (req: Request, res: Response) => {
  const { id } = req.params;
  await pool.query('DELETE FROM menus WHERE id=?', [id]);
  res.json({ message: 'Menú eliminado' });
};
