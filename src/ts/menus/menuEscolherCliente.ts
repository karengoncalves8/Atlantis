import ImpressorListaCliente from "../impressores/impressorListaClientes";
import Menu from "../interfaces/menu";
import Cliente from "../modelos/cliente";

export default class MenuEscolherCliente implements Menu {
    private clientes: Cliente[]

    constructor(clientes: Cliente[]){
        this.clientes = clientes
    }

    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Escolha um cliente: `)
        console.log(`----------------------`)
        let impressorListaClientes = new ImpressorListaCliente(this.clientes)
        console.log(impressorListaClientes.imprimir())
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}