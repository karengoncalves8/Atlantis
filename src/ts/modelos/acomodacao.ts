import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao"

export default class Acomodacao {
    private nomeAcomadacao: NomeAcomadacao
    private camaSolteiro: number
    private camaCasal: number
    private suite: number
    private climatizacao: Boolean
    private garagem: number
    private quantidadeDisponivel: number

    constructor(nomeAcomadacao: NomeAcomadacao, camaSolteiro: number, camaCasal: number,
        suite: number, climatizacao: Boolean, garagem: number, quantidadeDisponivel: number) {
        this.nomeAcomadacao = nomeAcomadacao
        this.camaSolteiro = camaSolteiro
        this.camaCasal = camaCasal
        this.suite = suite
        this.climatizacao = climatizacao
        this.garagem = garagem
        this.quantidadeDisponivel = quantidadeDisponivel
    }

    public get NomeAcomadacao() { return this.nomeAcomadacao }
    public get CamaSolteiro() { return this.camaSolteiro }
    public get CamaCasal() { return this.camaCasal }
    public get Suite() { return this.suite }
    public get Climatizacao() { return this.climatizacao }
    public get Garagem() { return this.garagem }
    public get QuantidadeDisponivel() { return this.quantidadeDisponivel }
    
    public set QuantidadeDisponivel(quantidadeDisponivel: number) { this.quantidadeDisponivel = quantidadeDisponivel}
}