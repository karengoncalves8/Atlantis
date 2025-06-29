import { NomeAcomadacao } from "../enumeracoes/NomeAcomadacao";
import Construtor from "../interfaces/construtor";
import Acomodacao from "../modelos/acomodacao";

export default class ConstrutorAcomodacao implements Construtor<Acomodacao>{
    private nomeAcomodacao: NomeAcomadacao = NomeAcomadacao.SolteiroSimples
    private camaSolteiro: number = 0
    private camaCasal: number = 0
    private suite: number = 0
    private climatizacao: Boolean = false
    private garagem: number = 0
    private quantidadeDisponivel: number = 0

    public set NomeAcomodacao(nomeAcomodacao: NomeAcomadacao) { this.nomeAcomodacao = nomeAcomodacao }
    public set CamaSolteiro(camaSolteiro: number) { this.camaSolteiro = camaSolteiro }
    public set CamaCasal(camaCasal: number) { this.camaCasal = camaCasal }
    public set Suite(suite: number) { this.suite = suite }
    public set Climatizacao(climatizacao: Boolean) { this.climatizacao = climatizacao }
    public set Garagem(garagem: number) { this.garagem = garagem }
    public set QuantidadeDisponivel(quantidadeDis: number) { this.quantidadeDisponivel = quantidadeDis }

    construir(): Acomodacao {
        let acomodacao = new Acomodacao(this.nomeAcomodacao, this.camaSolteiro,
            this.camaCasal, this.suite, this.climatizacao, this.garagem, this.quantidadeDisponivel)
        return acomodacao
    }
}