import Processo from "../../abstracoes/processo"

export default class ReceberDadosTelefone extends Processo {

    processar(): {numero: string, ddd: string} {
        console.log('Coletando os dados de telefone...')
        let ddd = this.entrada.receberTexto('Qual o ddd?')
        let numero = this.entrada.receberTexto('Qual o número?')
        return {numero, ddd}
    }
}