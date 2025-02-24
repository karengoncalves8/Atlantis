import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Cliente from "../../modelos/cliente";

export default class AssociarTitular extends Processo {
    private cliente: Cliente
    private clientesTitulares: Cliente[]

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.clientesTitulares = Armazem.InstanciaUnica.Clientes.filter((cliente) => cliente.Titular == undefined)
    }

    processar(): void {
        console.log('A qual titular deseja associar?')
        
        if(this.clientesTitulares.length > 0){
            this.clientesTitulares.forEach((item, index) => {
                console.log(`${index} - ${item.Nome}`)
            })
        }
        else{
            console.log('Não há clientes titulares cadastrados.')
        }

        let titularIndex = this.entrada.receberNumero('Opção escolhida: ')
        let titular = this.clientesTitulares[titularIndex]
        this.cliente.Titular = titular
        titular.Dependentes.push(this.cliente)
    }
}