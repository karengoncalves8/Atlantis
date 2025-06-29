import NomeAcomadacao from '../models/NomeAcomodacao';
import Acomodacao from '../models/Acomodacao';
import Cliente from '../models/Cliente';
import Endereco from '../models/Endereco';
import Telefone from '../models/Telefone';
import Documento from '../models/Documento';
import Hospedagem from '../models/Hospedagem';
import { TipoDocumento } from '../enums/tipoDocumento';
import sequelize from './db';

export default async function init() {
    try {
        // Sincronizar o banco de dados (criar tabelas se não existirem)
        await sequelize.sync({ force: true });
    
        console.log('Banco de dados sincronizado.');

        // Populando NomeAcomodacao
        const nomeAcomodacoes = await NomeAcomadacao.bulkCreate([
          { nome: 'Solteiro Simples' , descricao: 'Acomodação simples para solteiro(a)' },
          { nome: 'Casal Simples' , descricao: 'Acomodação simples para casal' },
          { nome: 'Famila Simples' , descricao: 'Acomodação para família com até duas crianças' },
          { nome: 'Familia Mais' , descricao: 'Acomodação para família com até cinco crianças' },
          { nome: 'Solteiro Mais' , descricao: 'Acomodação com garagem para solteiro(a)' },
          { nome: 'Familia Super' , descricao: 'Acomodação para até duas familias, casal e três crianças cada' },
        ], { returning: true });
    
        console.log("NomeAcomodacao populado com sucesso!");

        // Populando Acomodacao
        const acomodacoes = await Acomodacao.bulkCreate([
          { nomeAcomadacaoId: nomeAcomodacoes[0].id, camaSolteiro: 0, camaCasal: 1, suite: 1, climatizacao: true, garagem: 1, quantidadeDisponivel: 5 },
          { nomeAcomadacaoId: nomeAcomodacoes[1].id, camaSolteiro: 2, camaCasal: 1, suite: 1, climatizacao: true, garagem: 1, quantidadeDisponivel: 3 },
          { nomeAcomadacaoId: nomeAcomodacoes[2].id, camaSolteiro: 5, camaCasal: 1, suite: 2, climatizacao: true, garagem: 2, quantidadeDisponivel: 2 },
          { nomeAcomadacaoId: nomeAcomodacoes[3].id, camaSolteiro: 6, camaCasal: 2, suite: 3, climatizacao: true, garagem: 2, quantidadeDisponivel: 1 },
          { nomeAcomadacaoId: nomeAcomodacoes[4].id, camaSolteiro: 1, camaCasal: 0, suite: 1, climatizacao: true, garagem: 0, quantidadeDisponivel: 2 },
          { nomeAcomadacaoId: nomeAcomodacoes[5].id, camaSolteiro: 0, camaCasal: 1, suite: 1, climatizacao: true, garagem: 1, quantidadeDisponivel: 1 },
        ], { returning: true });

        // Populando Clientes (com endereço, telefone, documento)
        const cliente1 = await Cliente.create({
          nome: 'João Silva', nomeSocial: 'João', dataNascimento: new Date('1990-01-01'), dataCadastro: new Date(), titularId: null
        });
        await Endereco.create({
          rua: 'Rua das Flores', bairro: 'Centro', cidade: 'Cidade A', estado: 'SP', pais: 'Brasil', codigoPostal: '12345-000', clienteId: cliente1.id
        });
        await Telefone.create({ ddd: '11', numero: '999999999', clienteId: cliente1.id });
        await Documento.create({ numero: '12345678900', tipo: TipoDocumento.CPF, dataExpedicao: new Date('2010-01-01'), clienteId: cliente1.id });

        const cliente2 = await Cliente.create({
          nome: 'Maria Souza', nomeSocial: 'Maria', dataNascimento: new Date('1985-05-10'), dataCadastro: new Date(), titularId: null
        });
        await Endereco.create({
          rua: 'Av. Brasil', bairro: 'Jardim', cidade: 'Cidade B', estado: 'RJ', pais: 'Brasil', codigoPostal: '22222-000', clienteId: cliente2.id
        });
        await Telefone.create({ ddd: '21', numero: '988888888', clienteId: cliente2.id });
        await Documento.create({ numero: 'MG1234567', tipo: TipoDocumento.RG, dataExpedicao: new Date('2005-05-10'), clienteId: cliente2.id });

        // Dependente de Maria
        const cliente3 = await Cliente.create({
          nome: 'Pedro Souza', nomeSocial: 'Pedro', dataNascimento: new Date('2010-09-15'), dataCadastro: new Date(), titularId: cliente2.id
        });
        await Endereco.create({
          rua: 'Av. Brasil', bairro: 'Jardim', cidade: 'Cidade B', estado: 'RJ', pais: 'Brasil', codigoPostal: '22222-000', clienteId: cliente3.id
        });
        await Telefone.create({ ddd: '21', numero: '977777777', clienteId: cliente3.id });
        await Documento.create({ numero: '98765432100', tipo: TipoDocumento.CPF, dataExpedicao: new Date('2018-09-15'), clienteId: cliente3.id });

        // Populando Hospedagens
        await Hospedagem.create({
          tipoAcomadacaoId: nomeAcomodacoes[1].id, // Casal Simples
          clienteTitularId: cliente2.id, // Maria
          dataEntrada: new Date('2024-07-01'),
          dataSaida: new Date('2024-07-10'),
          dias: 9
        });
        await Hospedagem.create({
          tipoAcomadacaoId: nomeAcomodacoes[0].id, // Solteiro Simples
          clienteTitularId: cliente1.id, // João
          dataEntrada: new Date('2024-07-05'),
          dataSaida: new Date('2024-07-12'),
          dias: 7
        });
        await Hospedagem.create({
          tipoAcomadacaoId: nomeAcomodacoes[2].id, // Familia Simples
          clienteTitularId: cliente2.id, // Maria
          dataEntrada: new Date('2024-08-01'),
          dataSaida: new Date('2024-08-15'),
          dias: 14
        });

        console.log('Banco de dados populado com sucesso!');
      } catch (error) {
        console.error('Erro ao popular banco de dados:', error);
      }
}