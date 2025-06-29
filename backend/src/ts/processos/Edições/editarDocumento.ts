import Processo from "../../abstracoes/processo"
import MenuEscolherDocumentos from "../../menus/menuEscolherDocumento"
import Documento from "../../modelos/documento"
import ReceberDadosDocumentos from "../ReceberInformações/receberDadosDocumentos"


export default class EditarDocumentos extends Processo {
    private documentos: Documento[]

    constructor(documentos: Documento[]) {
        super()
        this.documentos = documentos
        this.menu = new MenuEscolherDocumentos(this.documentos)
        this.execucao = true
    }
    
    processar(): void {
        console.clear()

        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual documento deseja editar?')
            let documento = this.documentos[this.opcao - 1]
            if(this.opcao == 0){
                this.execucao = false
            }
            else if(documento){
                let receberDadosDocumento = new ReceberDadosDocumentos()
                let dadosDocumento = receberDadosDocumento.processar()

                documento.DataExpedicao = dadosDocumento.dataExpedicao
                documento.Numero = dadosDocumento.numero
            }else{
                console.log('Documento não encontrado')
                this.execucao = false
            }

        }
    }
}