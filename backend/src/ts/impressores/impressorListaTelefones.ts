import Impressor from "../interfaces/impressor";
import Telefone from "../modelos/telefone";

export default class ImpressorListaTelefones implements Impressor {
    private telefones: Telefone[]

    constructor(telefones: Telefone[]) {
        this.telefones = telefones
    }

    imprimir(): string {
        let impressao = `****************************\n`

        if(this.telefones.length > 0){
            this.telefones.forEach((item, index) => {
                impressao = impressao + `\n|${index + 1} - (${item.Ddd}) ${item.Numero}`
            })
        }
        else{
            console.log('Não há telefones cadastrados.')
        }

        impressao = impressao + `\n****************************`
        return impressao
    }

}