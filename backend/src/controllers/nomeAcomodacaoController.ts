import { Request, Response } from 'express';
import NomeAcomadacao from '../models/NomeAcomodacao';

export const controllerNomeAcomodacao = {
    // GET /acomodacoes - Exibir todas as acomodacoes disponíveis 
    getAllNomeAcomodacoes: async (req: Request, res: Response): Promise<void> => {
        try {
        const acomodacoes = await NomeAcomadacao.findAll();

        res.status(200).json(acomodacoes);
        } catch (error: unknown) {
        // Tratamento de erro
        if (error instanceof Error) {
            res.status(400).json({ error: 'Erro ao buscar nome acomodacoes', details: error.message });
        }
            res.status(400).json({ error: 'Erro desconhecido ao buscar nome acomodacoes' });
        }
    },
}