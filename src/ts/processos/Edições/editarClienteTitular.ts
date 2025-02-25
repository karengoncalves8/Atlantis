import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import MenuEscolherCliente from "../../menus/menuEscolherCliente"
import Cliente from "../../modelos/cliente"
import ReceberDadosBasicosCliente from "../ReceberInformações/receberDadosBasicosCliente"
import ReceberDadosEndereco from "../ReceberInformações/receberDadosEndereco"
import EditarDocumentos from "./editarDocumento"
import EditarTelefone from "./editarTelefone"


export default class EditarClienteTitular extends Processo {
    private clientes: Cliente[]

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes.filter((cliente) => cliente.Titular == undefined)
        this.menu = new MenuEscolherCliente(this.clientes)
        this.execucao = true
    }
    
    processar(): void {
        console.clear()

        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual cliente deseja editar?')
            let titular = this.clientes[this.opcao - 1]
            if(this.opcao == 0){
                this.execucao = false
            }
            else if(titular){
                let receberDadosBasicos = new ReceberDadosBasicosCliente()
                let dadosBasicos = receberDadosBasicos.processar()
                titular.Nome = dadosBasicos.nome
                titular.NomeSocial = dadosBasicos.nomeSocial,
                titular.DataNascimento = dadosBasicos.dataNascimento

                let receberDadosEndereco = new ReceberDadosEndereco()
                let dadosEndereco = receberDadosEndereco.processar()
                titular.Endereco.Bairro = dadosEndereco.bairro
                titular.Endereco.Rua = dadosEndereco.rua
                titular.Endereco.Cidade = dadosEndereco.cidade
                titular.Endereco.CodigoPostal = dadosEndereco.codigoPostal
                titular.Endereco.Pais = dadosEndereco.pais

                let editarDocumentos = new EditarDocumentos(titular.Documentos)
                editarDocumentos.processar()

                let editarTelefones = new EditarTelefone(titular.Telefones)
                editarTelefones.processar()

            }else{
                console.log('Cliente não encontrado')
                this.execucao = false
            }

        }

        console.log('Finalizando o cadastro do cliente...')
    }
}