import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import MenuEscolherCliente from "../../menus/menuEscolherCliente";
import Cliente from "../../modelos/cliente";

export default class ListagemTitularEspecifico extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes.filter((cliente) => cliente.Titular != undefined)
        this.menu = new MenuEscolherCliente(this.clientes)
        this.execucao = true
    }
    processar(): void {
        console.clear()

        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('De qual cliente deseja ver o titular?')
            let dependente = this.clientes[this.opcao - 1]
            if(this.opcao == 0){
                this.execucao = false
            }
            else if(dependente){
                console.log('Lista de titulares...')
                this.impressor = new ImpressaorCliente(dependente.Titular)
                console.log(this.impressor.imprimir())
            }else{
                console.log('Cliente não encontrado')
                this.execucao = false
            }
        }
    }
}