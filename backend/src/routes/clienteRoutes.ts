import { Router } from 'express';
import { controllerCliente } from '../controllers/clienteController';

const router = Router();

// Criar um novo cliente
router.post('/', controllerCliente.createCliente);
// Buscar todos os clientes
router.get('/', controllerCliente.getAllClientes);
// Buscar cliente por ID
router.get('/:id', controllerCliente.getClienteById);
// Atualizar cliente
router.put('/:id', controllerCliente.updateCliente);
// Deletar cliente
router.delete('/:id', controllerCliente.deleteCliente);

export default router;
