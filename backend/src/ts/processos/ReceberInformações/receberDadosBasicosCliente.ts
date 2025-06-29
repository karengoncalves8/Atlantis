import Processo from "../../abstracoes/processo"

export default class ReceberDadosBasicosCliente extends Processo {

    processar(): {nome: string, nomeSocial: string, dataNascimento: Date} {
        console.log('Coletando os dados básicos do cliente...')
        let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
        let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
        let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
        return {nome, nomeSocial, dataNascimento}
    }

}