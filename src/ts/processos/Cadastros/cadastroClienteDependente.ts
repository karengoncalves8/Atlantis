import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import Cliente from "../../modelos/cliente"
import Endereco from "../../modelos/endereco"
import Telefone from "../../modelos/telefone"
import ReceberDadosBasicosCliente from "../ReceberInformações/receberDadosBasicosCliente"
import AssociarTitular from "./associarTitular"
import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente"


export default class CadastroClienteDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de um novo cliente dependente...')
        let receberDadosBasicos = new ReceberDadosBasicosCliente()
        let dadosBasicos = receberDadosBasicos.processar()
        let cliente = new Cliente(dadosBasicos.nome, dadosBasicos.nomeSocial, dadosBasicos.dataNascimento)

        this.processo = new AssociarTitular(cliente)
        this.processo.processar()

        cliente.Endereco = (cliente.Titular.Endereco.clonar() as Endereco)
        cliente.Telefones.push(...cliente.Titular.Telefones.map((telefone) => telefone.clonar() as Telefone))

        this.processo = new CadastrarDocumentosCliente(cliente)
        this.processo.processar()

        let armazem = Armazem.InstanciaUnica
        armazem.Clientes.push(cliente)

        console.log('Finalizando o cadastro do cliente...')
    }
}