import Processo from "../../abstracoes/processo"
import Cliente from "../../modelos/cliente"
import Endereco from "../../modelos/endereco"
import ReceberDadosEndereco from "../ReceberInformações/receberDadosEndereco"

export default class CadastroEnderecoTitular extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        console.log('Coletando os dados de endereço...')
        let receberDados = new ReceberDadosEndereco()
        let dadosEndereco = receberDados.processar()
        let endereco = new Endereco(dadosEndereco.rua, dadosEndereco.bairro, dadosEndereco.cidade, dadosEndereco.estado, dadosEndereco.pais, dadosEndereco.codigoPostal)
        this.cliente.Endereco = endereco
    }

}