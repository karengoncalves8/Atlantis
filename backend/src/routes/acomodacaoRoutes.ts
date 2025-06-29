import { Router } from 'express';
import { controllerAcomodacao } from '../controllers/acomodacaoController';

const router = Router();

// Rota para criar um novo cliente
router.get('/', controllerAcomodacao.getAllAcomodacoes);

export default router;