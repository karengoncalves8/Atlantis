import ImpressorListaAcomodacao from "../impressores/impressorListaAcomodacao";
import Menu from "../interfaces/menu";
import Acomodacao from "../modelos/acomodacao";

export default class MenuEscolherAcomodacao implements Menu {
    private acomodacoes: Acomodacao[]

    constructor(acomodacoes: Acomodacao[]){
        this.acomodacoes = acomodacoes
    }

    mostrar(): void {
        console.log(`****************************`)
        console.log(`| Escolha uma acomodação: `)
        console.log(`----------------------`)
        let impressorListaAcomodacoes = new ImpressorListaAcomodacao(this.acomodacoes)
        console.log(impressorListaAcomodacoes.imprimir())
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}