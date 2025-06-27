import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import MenuEscolherCliente from "../../menus/menuEscolherCliente"
import Cliente from "../../modelos/cliente"

export default class ReceberDadosEndereco extends Processo {
    private clientes: Cliente[]

    constructor(){
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): {rua: string, bairro: string, cidade: string, estado:string, pais: string, codigoPostal:string} {
        console.log('Coletando os dados de hospedagem...')

        let todosClientesTitulares = this.clientes.filter((cliente) => cliente.Titular == undefined)
        let todosClientesDependentes = this.clientes.filter((cliente) => cliente.Titular !== undefined)

        let tipoAcomodacao = this.entrada.receberTexto('Qual tipo de acomodação?')
        
        let escolhendoTitular = true

        while(escolhendoTitular){
            let menuEscolherTitular = new MenuEscolherCliente(todosClientesTitulares)
            menuEscolherTitular.mostrar()
            let opcaoTitular = this.entrada.receberNumero('Qual cliente será o titular?')
            let clienteTitular = todosClientesTitulares[opcaoTitular - 1]
            if(this.opcao == 0){
                this.execucao = false
            }else if(!clienteTitular){
                this.execucao = false
            }
        }
        
        let escolhendoDependentes = true

        console.log("Escolha os dependentes que estarão junto com o titular:")
        while(escolhendoDependentes){
            
        }
        let cidade = this.entrada.receberTexto('Qual a cidade?')
        let estado = this.entrada.receberTexto('Qual o estado?')
        let pais = this.entrada.receberTexto('Qual o país?')
        let codigoPostal = this.entrada.receberTexto('Qual o código postal?')
        return {rua, bairro, cidade, estado, pais, codigoPostal}
    }

}