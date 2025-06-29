import { Request, Response } from 'express';
import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';
import Telefone from '../models/Telefone';
import Documento from '../models/Documento';


export const controllerCliente = {
  // POST /cliente - Criar um novo cliente
  createCliente: async (req: Request, res: Response): Promise<void> => {
    const { nome, nomeSocial, dataNascimento, isDependente, endereco, documentos, telefones, titularId } = req.body;

    try {
      // Criação do Cliente
      const cliente = await Cliente.create({
        nome,
        nomeSocial,
        dataNascimento,
        dataCadastro: new Date(),
        titularId: isDependente ? titularId : null, // Se for dependente, associa ao titular
      });

      // Criação do Endereco
      await Endereco.create({
        rua: endereco.rua,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        pais: endereco.pais,
        codigoPostal: endereco.codigoPostal,
        clienteId: cliente.id,
      });

      // Criação dos Telefones
      for (const telefone of telefones) {
        await Telefone.create({
          ddd: telefone.ddd,
          numero: telefone.numero,
          clienteId: cliente.id,
        });
      }

      // Criação dos Documentos
      for (const doc of documentos) {
        await Documento.create({
          numero: doc.numero,
          tipo: doc.tipo, 
          dataExpedicao: doc.dataExpedicao,
          clienteId: cliente.id,
        });
      }

      res.status(201).json({ message: 'Cliente criado com sucesso!', cliente });
    } catch (error: any) {
      res.status(400).json({ error: 'Erro ao criar cliente', details: error.message });
    }
  },

  // GET / Exibir todos os clientes
  getAllClientes: async (req: Request, res: Response): Promise<void> => {
    try {
      const clientes = await Cliente.findAll({
        include: [
          Endereco, 
          Telefone, 
          Documento,
          {
            model: Cliente,
            as: 'titular',
            include: [Endereco, Telefone, Documento]
          }
        ], // Incluindo os relacionamentos
      });
      res.status(200).json(clientes);
    } catch (error: any) {
      res.status(400).json({ error: 'Erro ao buscar clientes', details: error.message });
    }
  },

  // GET / Exibir cliente específico
  getClienteById: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findByPk(id, {
        include: [
          Endereco, 
          Telefone, 
          Documento,
          {
            model: Cliente,
            as: 'titular',
            include: [Endereco, Telefone, Documento]
          }
        ], // Incluindo os relacionamentos
      });
      if (!cliente) {
        res.status(404).json({ message: 'Cliente não encontrado!' });
        return;
      }
      res.status(200).json(cliente);
    } catch (error: any) {
      res.status(400).json({ error: 'Erro ao buscar cliente', details: error.message });
    }
  },

  // PUT / Editar um cliente
  updateCliente: async (req: Request, res: Response): Promise<void> => {
    const { nome, nomeSocial, dataNascimento, endereco, documentos, telefones, isDependente, titularId } = req.body;
    const { id } = req.params;

    try {
      const [updatedCliente] = await Cliente.update(
        {
          nome,
          nomeSocial,
          dataNascimento,
          titularId: isDependente ? titularId : null, // Se for dependente, associa ao titular
        },
        { where: { id } }
      );

      const [updatedEndereco] = await Endereco.update(
        {
          rua: endereco.rua,
          bairro: endereco.bairro,
          cidade: endereco.cidade,
          estado: endereco.estado,
          pais: endereco.pais,
          codigoPostal: endereco.codigoPostal,
        },
        { where: { clienteId: id } }
      );

      await Telefone.destroy({ where: { clienteId: id } }); // Deleta telefones antigos
      for (const telefone of telefones) {
        await Telefone.create({
          ddd: telefone.ddd,
          numero: telefone.numero,
          clienteId: id,
        });
      }

      await Documento.destroy({ where: { clienteId: id } }); // Deleta documentos antigos
      for (const doc of documentos) {
        await Documento.create({
          numero: doc.numero,
          tipo: doc.tipo, // Mapear o tipo para o valor do enum
          dataExpedicao: doc.dataExpedicao,
          clienteId: id,
        });
      }

      if (updatedCliente || updatedEndereco) {
        const clienteAtualizado = await Cliente.findByPk(id, {
          include: [
            Endereco, 
            Telefone, 
            Documento,
            {
              model: Cliente,
              as: 'titular',
              include: [Endereco, Telefone, Documento]
            }
          ], // Incluindo os relacionamentos
        });
        res.status(200).json({
          message: 'Cliente atualizado com sucesso!',
          cliente: clienteAtualizado,
        });
        return;
      }

      res.status(400).json({ message: 'Nenhuma alteração realizada no cliente.' });
    } catch (error: any) {
      res.status(400).json({ error: 'Erro ao atualizar cliente', details: error.message });
    }
  },

  // DELETE / Remover um cliente
  deleteCliente: async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const deleted = await Cliente.destroy({ where: { id } });
      res.status(200).json({ message: 'Cliente deletado com sucesso!', deleted });
    } catch (error: any) {
      res.status(400).json({ error: 'Erro ao deletar cliente', details: error.message });
    }
  },
};
