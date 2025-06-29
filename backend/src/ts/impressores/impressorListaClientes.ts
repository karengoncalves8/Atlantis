import Impressor from "../interfaces/impressor";
import Cliente from "../modelos/cliente";

export default class ImpressorListaCliente implements Impressor {
    private clientes: Cliente[]

    constructor(clientes: Cliente[]) {
        this.clientes = clientes
    }

    imprimir(): string {
        let impressao = ''

        if(this.clientes.length > 0){
            this.clientes.forEach((item, index) => {
                impressao = impressao + `\n| ${index + 1} - ${item.Nome}`
            })
        }
        else{
            impressao = impressao + '\nNão há clientes cadastrados.'
        }

        return impressao
    }

}