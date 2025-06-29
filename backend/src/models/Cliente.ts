import { Column, Model, Table, HasMany, BelongsTo, ForeignKey, DataType, HasOne } from 'sequelize-typescript';
import Telefone from './Telefone';
import Endereco from './Endereco';
import Documento from './Documento';
import Hospedagem from './Hospedagem';

@Table
export default class Cliente extends Model {
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
    nomeSocial!: string;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    dataNascimento!: Date;

    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    dataCadastro!: Date;

    @HasMany(() => Telefone)
    telefones!: Telefone[];

    @HasOne(() => Endereco)
    endereco!: Endereco;

    @HasMany(() => Documento)
    documentos!: Documento[];

    @HasMany(() => Cliente)
    dependentes!: Cliente[];

    @HasMany(() => Hospedagem, 'clienteTitularId')
    hospedagens!: Hospedagem[];

    @ForeignKey(() => Cliente)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    titularId!: number;

    @BelongsTo(() => Cliente, 'titularId')
    titular!: Cliente;
}
