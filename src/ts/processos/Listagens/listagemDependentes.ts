import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemDependentes extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }
    processar(): void {
        console.clear()
        console.log('De qual titular deseja listar?')
        let titulares = this.clientes.filter((cliente) => cliente.Titular == undefined)
        if(titulares.length > 0){
            titulares.forEach((item, index) => {
                console.log(`${index} - ${item.Nome}`)
            })
        }
        else{
            console.log('Não há clientes titulares cadastrados.')
        }

        let titularIndex = this.entrada.receberNumero('Opção escolhida: ')
        let titular = titulares[titularIndex]

        titular.Dependentes.forEach(cliente => {
            this.impressor = new ImpressaorCliente(cliente)
            console.log(this.impressor.imprimir())
        })
    }
}