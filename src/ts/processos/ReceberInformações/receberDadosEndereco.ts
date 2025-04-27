import Processo from "../../abstracoes/processo"

export default class ReceberDadosEndereco extends Processo {

    processar(): {rua: string, bairro: string, cidade: string, estado:string, pais: string, codigoPostal:string} {
        console.log('Coletando os dados de endereço...')
        let rua = this.entrada.receberTexto('Qual a rua?')
        let bairro = this.entrada.receberTexto('Qual o bairro?')
        let cidade = this.entrada.receberTexto('Qual a cidade?')
        let estado = this.entrada.receberTexto('Qual o estado?')
        let pais = this.entrada.receberTexto('Qual o país?')
        let codigoPostal = this.entrada.receberTexto('Qual o código postal?')
        return {rua, bairro, cidade, estado, pais, codigoPostal}
    }

}