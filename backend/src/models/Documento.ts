import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { TipoDocumento } from '../enums/tipoDocumento';
import Cliente from './Cliente';

@Table
export default class Documento extends Model {
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
    numero!: string;

    @Column({
        type: DataType.INTEGER,
        validate: {
        isInt: true,
        },
        allowNull: false
    })
    tipo!: TipoDocumento;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    dataExpedicao!: Date;

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    clienteId!: number;

    @BelongsTo(() => Cliente)
    cliente!: Cliente;
}
