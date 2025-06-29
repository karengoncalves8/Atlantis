import Impressor from "../interfaces/impressor";
import Acomodacao from "../modelos/acomodacao";

export default class ImpressorListaAcomodacao implements Impressor {
    private acomodacoes: Acomodacao[]

    constructor(acomodacoes: Acomodacao[]) {
        this.acomodacoes = acomodacoes
    }

    imprimir(): string {
        let impressao = ''

        if(this.acomodacoes.length > 0){
            this.acomodacoes.forEach((item, index) => {
                impressao = impressao + `\n| ${index + 1} - ${item.NomeAcomadacao}`
            })
        }
        else{
            impressao = impressao + '\nNão há acomodações cadastradas.'
        }

        return impressao
    }

}