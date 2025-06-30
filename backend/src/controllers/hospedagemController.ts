import { Request, Response } from 'express';
import { Op, Transaction } from 'sequelize';
import Hospedagem from '../models/Hospedagem';
import NomeAcomadacao from '../models/NomeAcomodacao';
import Cliente from '../models/Cliente';
import Acomodacao from '../models/Acomodacao';
import db from '../config/db';

export const controllerHospedagem = {
    // POST /hospedagem - Criar uma nova hospedagem
    createHospedagem: async (req: Request, res: Response): Promise<void> => {
        const { tipoAcomadacaoId, clienteTitularId, dataEntrada, dataSaida, dias } = req.body;

        let transaction: Transaction | undefined;

        try {
            // Iniciar transação
            transaction = await db.transaction();

            // Verificar se há acomodações disponíveis
            const acomodacao = await Acomodacao.findOne({
                where: {
                    nomeAcomadacaoId: tipoAcomadacaoId,
                    quantidadeDisponivel: { [Op.gt]: 0 }
                },
                transaction
            });

            if (!acomodacao) {
                await transaction.rollback();
                res.status(400).json({ error: 'Não há acomodações disponíveis deste tipo' });
                return;
            }

            // Criar a hospedagem
            const hospedagem = await Hospedagem.create({
                tipoAcomadacaoId,
                clienteTitularId,
                dataEntrada,
                dataSaida,
                dias,
            }, { transaction });

            // Atualizar a quantidade disponível
            const quantidadeDisponivel = acomodacao.quantidadeDisponivel - 1;
            
            await acomodacao.update({
                quantidadeDisponivel,
            }, { transaction });

            // Commit da transação
            await transaction.commit();

            res.status(201).json({ message: 'Hospedagem criada com sucesso!', hospedagem });
        } catch (error: any) {
            // Rollback em caso de erro
            if (transaction) {
                await transaction.rollback();
            }
            res.status(400).json({ error: 'Erro ao criar hospedagem', details: error.message });
        }
    },

    // GET /hospedagens - Exibir todas as hospedagens
    getAllHospedagens: async (req: Request, res: Response): Promise<void> => {
        try {
        // Buscar todas as hospedagens com os relacionamentos
        const hospedagens = await Hospedagem.findAll({
            include: [NomeAcomadacao, Cliente], 
        });

        res.status(200).json(hospedagens);
        } catch (error: any) {
        // Tratamento de erro
        res.status(400).json({ error: 'Erro ao buscar hospedagens', details: error.message });
        }
    },
};
