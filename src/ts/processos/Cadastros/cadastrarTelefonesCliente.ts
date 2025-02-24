import Processo from "../../abstracoes/processo";
import MenuCadastroTelefones from "../../menus/menuCadastroTelefones";
import Cliente from "../../modelos/cliente";
import CadastroTelefoneTitular from "./cadastroTelefoneTitular";

export default class CadastrarTelefonesCliente extends Processo {
    private cliente: Cliente
    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.menu = new MenuCadastroTelefones()
        this.execucao = true
    }

    processar(): void {
        console.log('Inciando o cadastro de Telefones...')
        while (this.execucao) {
            this.menu.mostrar()
            this.opcao = this.entrada.receberNumero('Qual opção desejada?')
            switch (this.opcao) {
                case 1:
                    this.processo = new CadastroTelefoneTitular(this.cliente)
                    this.processo.processar()
                    break
                case 0:
                    this.execucao = false
                    break
                default:
                    console.log('Opção não entendida :(')
            }
        }
    }
}