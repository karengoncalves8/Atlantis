import { Request, Response } from 'express';
import Hospedagem from '../models/Hospedagem';
import NomeAcomadacao from '../models/NomeAcomodacao';
import Cliente from '../models/Cliente';

export const controllerHospedagem = {
    // POST /hospedagem - Criar uma nova hospedagem
    createHospedagem: async (req: Request, res: Response): Promise<void> => {
        const { tipoAcomadacaoId, clienteTitularId, clientesDependentes, dataEntrada, dataSaida, dias } = req.body;

        try {
        // Criação da hospedagem
        const hospedagem = await Hospedagem.create({
            tipoAcomadacaoId,
            clienteTitularId,
            dataEntrada,
            dataSaida,
            dias,
        });

        res.status(201).json({ message: 'Hospedagem criada com sucesso!', hospedagem });
        } catch (error: any) {
        // Tratamento de erro
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
