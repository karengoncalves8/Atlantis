import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Cliente from "./cliente";

export default class Hospedagem {
    private tipoAcomodacao: NomeAcomadacao
    private clienteTitular: Cliente
    private clientesDependentes: Cliente[]
    private dataEntrada: Date
    private dataSaida: Date
    private dias: number

    constructor(tipoAcomodacao: NomeAcomadacao, clienteTitular: Cliente, clientesDependentes: Cliente[], dataEntrada: Date, dias: number){
        this.tipoAcomodacao = tipoAcomodacao
        this.clienteTitular = clienteTitular
        this.clientesDependentes = clientesDependentes
        this.dataEntrada = dataEntrada
        let prevDataSaida = new Date(dataEntrada)
        prevDataSaida.setDate(dataEntrada.getDate() + dias)
        this.dataSaida = prevDataSaida
        this.dias = dias
    }

    public get TipoAcomodacao() { return this.tipoAcomodacao }
    public get ClienteTitular() { return this.clienteTitular }
    public get ClientesDependentes() { return this.clientesDependentes }
    public get DataEntrada() { return this.dataEntrada }
    public get DataSaida() { return this.dataSaida}
    public get Dias() { return this.dias }

    public set TipoAcomodacao(tipoAcomodacao: NomeAcomadacao) { this.tipoAcomodacao = tipoAcomodacao }
    public set ClienteTitular(clienteTitular: Cliente) { this.clienteTitular = clienteTitular }
    public set ClientesDependentes(clientesDependentes: Cliente[]) { this.clientesDependentes = clientesDependentes }
    public set DataEntrada(dataEntrada: Date) { this.dataEntrada = dataEntrada }
    public set Dias(dias: number) { 
        this.dias = dias; 
        this.dataSaida.setDate(this.dataSaida.getDate() + dias)
    }
}