import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorListaHospedagem implements Impressor {
    private hospedagens: Hospedagem[]

    constructor(hospedagens: Hospedagem[]) {
        this.hospedagens = hospedagens
    }

    imprimir(): string {
        let impressao = ''

        if(this.hospedagens.length > 0){
            this.hospedagens.forEach((item, index) => {
                impressao = impressao + `\n| ${index + 1} - ${item.TipoAcomodacao} de ${item.ClienteTitular} por ${item.Dias} dias`
            })
        }
        else{
            impressao = impressao + '\nNão há hospedagens cadastrados.'
        }

        return impressao
    }

}