import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import Acomodacao from './Acomodacao';


@Table
export default class NomeAcomadacao extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    nome!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    descricao!: string;

    @HasMany(() => Acomodacao)
    acomodacoes!: Acomodacao[];
}
