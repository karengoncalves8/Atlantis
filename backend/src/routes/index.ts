import { Router } from 'express';
import acomodacaoRoutes from './acomodacaoRoutes';
import clienteRoutes from './clienteRoutes';
import hospedagemRoutes from './hospedagemRoutes';
import NomeAcomadacaoRoutes from './nomeAcomodacaoRoutes';


const router = Router();

// Rota para Acomodação
router.use('/acomodacao', acomodacaoRoutes)

// Rota para Cliente
router.use('/cliente', clienteRoutes)

// Rota para Hospedagem
router.use('/hospedagem', hospedagemRoutes)

// Rota para Nome Acomodações
router.use('/nome-acomodacao', NomeAcomadacaoRoutes)

export default router;