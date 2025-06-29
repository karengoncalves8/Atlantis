import ImpressorListaDocumentos from "../impressores/impressorListaDocumentos";
import Menu from "../interfaces/menu";
import Documento from "../modelos/documento";

export default class MenuEscolherDocumentos implements Menu {
    private documentos: Documento[]

    constructor(documentos: Documento[]){
        this.documentos = documentos
    }

    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| Escolha um documento: `)
        console.log(`----------------------`)
        let impressorListaDocumentos = new ImpressorListaDocumentos(this.documentos)
        console.log(impressorListaDocumentos.imprimir())
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}