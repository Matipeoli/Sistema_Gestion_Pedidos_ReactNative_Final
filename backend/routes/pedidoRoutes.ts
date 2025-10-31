import { Router } from 'express';
import { addPedido, getPedidosByUser } from '../controllers/pedidoController';
import { authMiddleware } from '../middlewares/authMiddleware';
const router = Router();

router.post('/', authMiddleware, addPedido);
router.get('/', authMiddleware, getPedidosByUser);

export default router;
