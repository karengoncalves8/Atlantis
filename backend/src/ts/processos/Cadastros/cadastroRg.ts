import Processo from "../../abstracoes/processo";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";
import ReceberDadosDocumentos from "../ReceberInformações/receberDadosDocumentos";

export default class CadastroRg extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
    }

    processar(): void {
        let receberDadosDocumento = new ReceberDadosDocumentos()
        let dadosDocumento = receberDadosDocumento.processar()
        let rg = new Documento(dadosDocumento.numero, TipoDocumento.RG, dadosDocumento.dataExpedicao)
        this.cliente.Documentos.push(rg)
    }
}