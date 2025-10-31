import { Router } from 'express';
import { getMenus, addMenu, editMenu, deleteMenu } from '../controllers/menuController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = Router();

router.get('/', getMenus);
router.post('/', authMiddleware, addMenu);
router.put('/:id', authMiddleware, editMenu);
router.delete('/:id', authMiddleware, deleteMenu);

export default router;
