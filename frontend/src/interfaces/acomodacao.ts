export interface NomeAcomadacao {
    id?: number
    nome: string
    descricao: string
}

export interface Acomodacao {
    id?: number
    nomeAcomadacao: NomeAcomadacao
    camaSolteiro: number
    camaCasal: number
    suite: number
    climatizacao: Boolean
    garagem: number
    quantidadeDisponivel: number
}