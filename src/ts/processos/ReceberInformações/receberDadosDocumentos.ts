import Processo from "../../abstracoes/processo"

export default class ReceberDadosDocumentos extends Processo {

    processar(): {numero: string, dataExpedicao: Date} {
        console.log('Coletando os dados do documento...')
        let numero = this.entrada.receberTexto('Qual o número do documento?')
        let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
        return {numero, dataExpedicao}
    }
}