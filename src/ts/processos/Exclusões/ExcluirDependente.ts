import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import MenuEscolherCliente from "../../menus/menuEscolherCliente"
import Cliente from "../../modelos/cliente"

export default class ExcluirCliente extends Processo {
    private clientes: Cliente[]

    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
        this.menu = new MenuEscolherCliente(this.clientes)
    }
    
    processar(): void {
        console.clear()

        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero('Qual cliente deseja excluir?')
        let cliente = this.clientes[this.opcao - 1]
        if(this.opcao == 0){
            this.execucao = false
        }
        else if(cliente){
            if(cliente.Titular == undefined){
                cliente.Dependentes = []
                console.log('Cliente titular detectado, excluindo dependentes...')
            }
            Armazem.InstanciaUnica.Clientes = [...this.clientes.slice(0, this.opcao - 1), ...this.clientes.slice(this.opcao)]
            console.log('Cliente excluído')
        }else{
            console.log('Cliente não encontrado')
            this.execucao = false
        }
    
    }
}