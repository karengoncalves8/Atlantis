import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import Cliente from "../../modelos/cliente"
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente"
import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente"
import CadastroEnderecoTitular from "./cadastroEnderecoTitular"
import ReceberDadosBasicosCliente from "../ReceberInformações/receberDadosBasicosCliente"


export default class CadastroClienteTitular extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente...')
        let receberDadosBasicos = new ReceberDadosBasicosCliente()
        let dadosBasicos = receberDadosBasicos.processar()
        let cliente = new Cliente(dadosBasicos.nome, dadosBasicos.nomeSocial, dadosBasicos.dataNascimento)

        this.processo = new CadastroEnderecoTitular(cliente)
        this.processo.processar()

        this.processo = new CadastrarTelefonesCliente(cliente)
        this.processo.processar()

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}