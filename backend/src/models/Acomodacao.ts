import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import NomeAcomadacao from './NomeAcomodacao';

@Table
export default class Acomodacao extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    id!: number;

    @ForeignKey(() => NomeAcomadacao) 
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    nomeAcomadacaoId!: number; 

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    camaSolteiro!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    camaCasal!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    suite!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false
    })
    climatizacao!: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    garagem!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    quantidadeDisponivel!: number;

    @BelongsTo(() => NomeAcomadacao) 
    nomeAcomadacao!: NomeAcomadacao;
}
