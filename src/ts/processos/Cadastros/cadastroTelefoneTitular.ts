import Processo from "../../abstracoes/processo"
import Cliente from "../../modelos/cliente"
import Telefone from "../../modelos/telefone"
import ReceberDadosTelefone from "../ReceberInformações/receberDadosTelefone"

export default class CadastroTelefoneTitular extends Processo {
    private cliente: Cliente

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let receberDadosTelefone = new ReceberDadosTelefone()
        let dadosTelefone = receberDadosTelefone.processar()
        let telefone = new Telefone(dadosTelefone.ddd, dadosTelefone.numero)
        this.cliente.Telefones.push(telefone)
    }

}