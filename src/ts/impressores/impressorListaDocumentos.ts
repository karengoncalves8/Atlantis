import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";

export default class ImpressorListaDocumentos implements Impressor {
    private documentos: Documento[]

    constructor(documentos: Documento[]) {
        this.documentos = documentos
    }

    imprimir(): string {
        let impressao = ''

        if(this.documentos.length > 0){
            this.documentos.forEach((item, index) => {
                impressao = impressao + `\n|${index + 1} - ${item.Tipo}: ${item.Numero}`
            })
        }
        else{
            console.log('Não há documentos cadastrados.')
        }

        return impressao
    }

}