import { Column, Model, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import NomeAcomadacao from './NomeAcomodacao';  
import Cliente from './Cliente';  

@Table
export default class Hospedagem extends Model {
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
    tipoAcomadacaoId!: number; 

    @BelongsTo(() => NomeAcomadacao)
    tipoAcomadacao!: NomeAcomadacao;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    clienteTitularId!: number; 

    @BelongsTo(() => Cliente)
    clienteTitular!: Cliente;
    
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    dataEntrada!: Date;  

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    dataSaida!: Date;  

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    dias!: number;  
}
