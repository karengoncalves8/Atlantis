import { Request, Response } from 'express';
import Acomodacao from '../models/Acomodacao';
import NomeAcomadacao from '../models/NomeAcomodacao';

export const controllerAcomodacao = {
    // GET /acomodacoes - Exibir todas as acomodacoes disponíveis 
    getAllAcomodacoes: async (req: Request, res: Response): Promise<void> => {
        try {
        const acomodacoes = await Acomodacao.findAll({
            include: [NomeAcomadacao], 
        });

        res.status(200).json(acomodacoes);
        } catch (error: unknown) {
        // Tratamento de erro
        if (error instanceof Error) {
            res.status(400).json({ error: 'Erro ao buscar acomodacoes', details: error.message });
        }
            res.status(400).json({ error: 'Erro desconhecido ao buscar acomodacoes' });
        }
    },
}