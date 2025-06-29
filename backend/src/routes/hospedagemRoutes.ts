import { Router } from 'express';
import { controllerHospedagem } from '../controllers/hospedagemController';

const router = Router();

// Criar uma nova hospedagem
router.post('/', controllerHospedagem.createHospedagem);
// Buscar todas as hospedagens
router.get('/', controllerHospedagem.getAllHospedagens);

export default router;
