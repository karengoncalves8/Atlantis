import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import Acomodacao from '../models/Acomodacao';
import Cliente from '../models/Cliente';
import Documento from '../models/Documento';
import Endereco from '../models/Endereco';
import Hospedagem from '../models/Hospedagem';
import NomeAcomadacao from '../models/NomeAcomodacao';
import Telefone from '../models/Telefone';

dotenv.config();

const sequelize = new Sequelize({
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST, 
    port: parseInt(process.env.DB_PORT!),
    dialect: 'mysql',
    models: [Acomodacao, Cliente, Documento, Endereco, Hospedagem, NomeAcomadacao, Telefone],
  });
  
  export default sequelize;