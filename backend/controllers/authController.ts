import { Request, Response } from 'express';
import { pool } from '../config/database';
import bcrypt from 'bcrypt';
import { signToken } from '../utils/jwt';

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashed]);
  const insertId = (result as any).insertId;
  const token = signToken({ id: insertId, email });
  res.json({ id: insertId, name, email, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const [rows] = await pool.query('SELECT * FROM users WHERE email=? LIMIT 1', [email]);
  const user = (rows as any)[0];
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = signToken({ id: user.id, email: user.email });
  res.json({ id: user.id, name: user.name, email: user.email, token });
};
