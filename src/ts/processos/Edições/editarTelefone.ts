import Processo from "../../abstracoes/processo"
import MenuEscolherTelefone from "../../menus/menuEscolherTelefone"
import Telefone from "../../modelos/telefone"
import ReceberDadosDocumentos from "../ReceberInformações/receberDadosDocumentos"
import ReceberDadosTelefone from "../ReceberInformações/receberDadosTelefone"


export default class EditarTelefone extends Processo {
    private telefones: Telefone[]

    constructor(telefones: Telefone[]) {
        super()
        this.telefones = telefones
        this.menu = new MenuEscolherTelefone(this.telefones)
        this.execucao = true
    }
    
    processar(): void {
        console.clear()

        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual telefone deseja editar?')
            let telefone = this.telefones[this.opcao - 1]
            if(this.opcao == 0){
                this.execucao = false
            }
            else if(telefone){
                let receberDadosTelefone = new ReceberDadosTelefone()
                let dadosTelefone = receberDadosTelefone.processar()

                telefone.Ddd = dadosTelefone.ddd
                telefone.Numero = dadosTelefone.numero
            }else{
                console.log('Telefone não encontrado')
                this.execucao = false
            }

        }
    }
}