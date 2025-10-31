import { Request, Response } from 'express';
import { pool } from '../config/database';

export const addPedido = async (req: Request, res: Response) => {
  // req.user debe traer id (desde middleware)
  const userId = (req as any).user.id;
  const { menuId, date } = req.body; // date: '2025-10-30' por ejemplo
  const [result] = await pool.query('INSERT INTO pedidos (user_id, menu_id, fecha) VALUES (?, ?, ?)', [userId, menuId, date]);
  res.json({ id: (result as any).insertId, userId, menuId, fecha: date });
};

export const getPedidosByUser = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const [rows] = await pool.query(
    `SELECT p.id, p.fecha, m.id as menuId, m.title, m.description, m.image
     FROM pedidos p
     JOIN menus m ON p.menu_id = m.id
     WHERE p.user_id = ? ORDER BY p.fecha`, [userId]
  );
  res.json(rows);
};
