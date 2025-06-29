import { Router } from 'express';
import { controllerNomeAcomodacao } from '../controllers/nomeAcomodacaoController';

const router = Router();

// Rota para criar um novo cliente
router.get('/', controllerNomeAcomodacao.getAllNomeAcomodacoes);

export default router;