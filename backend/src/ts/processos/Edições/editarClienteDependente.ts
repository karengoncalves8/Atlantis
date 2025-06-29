import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import MenuEscolherCliente from "../../menus/menuEscolherCliente"
import Cliente from "../../modelos/cliente"
import ReceberDadosBasicosCliente from "../ReceberInformações/receberDadosBasicosCliente"
import EditarDocumentos from "./editarDocumento"

export default class EditarClienteDependente extends Processo {
    private clientes: Cliente[]

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes.filter((cliente) => cliente.Titular !== undefined)
        this.menu = new MenuEscolherCliente(this.clientes)
        this.execucao = true
    }
    
    processar(): void {
        console.clear()

        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual cliente deseja editar?')
            let dependente = this.clientes[this.opcao - 1]
            if(this.opcao == 0){
                this.execucao = false
            }
            else if(dependente){
                let receberDadosBasicos = new ReceberDadosBasicosCliente()
                let dadosBasicos = receberDadosBasicos.processar()
                dependente.Nome = dadosBasicos.nome
                dependente.NomeSocial = dadosBasicos.nomeSocial,
                dependente.DataNascimento = dadosBasicos.dataNascimento

                let alterarTitular = this.entrada.receberTexto('Deseja alterar o titular? S/N')
                if(alterarTitular.toUpperCase() == 'S'){
                    this.menu.mostrar()
                    let titularIndex = this.entrada.receberNumero('Para qual cliente titular deseja associar?')
                    let titular = this.clientes[titularIndex - 1]
                    if(titular){
                        dependente.Titular = titular
                    }else{
                        console.log('Cliente não encontrado')
                    }
                }

                let editarDocumentos = new EditarDocumentos(dependente.Documentos)
                editarDocumentos.processar()

            }else{
                console.log('Cliente não encontrado')
                this.execucao = false
            }

        }

        console.log('Finalizando edição do cliente...')
    }
}