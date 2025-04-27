import ImpressorListaTelefones from "../impressores/impressorListaTelefones";
import Menu from "../interfaces/menu";
import Telefone from "../modelos/telefone";

export default class MenuEscolherTelefone implements Menu {
    private telefones: Telefone[]

    constructor(telefones: Telefone[]){
        this.telefones = telefones
    }

    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Escolha um telefone: `)
        console.log(`----------------------`)
        let impressorListaTelefones = new ImpressorListaTelefones(this.telefones)
        console.log(impressorListaTelefones.imprimir())
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}