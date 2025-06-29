import Processo from "../../abstracoes/processo"
import Armazem from "../../dominio/armazem"
import { NomeAcomadacao } from "../../enumeracoes/NomeAcomadacao"
import MenuEscolherAcomodacao from "../../menus/menuEscolherAcomodacao"
import MenuEscolherCliente from "../../menus/menuEscolherCliente"
import Acomodacao from "../../modelos/acomodacao"
import Cliente from "../../modelos/cliente"

export default class ReceberDadosHospedagem extends Processo {
    private clientes: Cliente[]
    private acomodacoes: Acomodacao[]

    constructor(){
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes.filter(acomodacao => acomodacao.QuantidadeDisponivel > 0);
    }

    processar(): {tipoAcomodacao: NomeAcomadacao, clienteTitular: Cliente, clientesDependentes: Cliente[], dataEntrada: Date, dias: number} {
        console.log('Coletando os dados de hospedagem...')

        let todosClientesTitulares = this.clientes.filter((cliente) => cliente.Titular == undefined)

        let tipoAcomodacao = NomeAcomadacao.CasalSimples;

        let menuEscolherAcomodacao = new MenuEscolherAcomodacao(this.acomodacoes)
        menuEscolherAcomodacao.mostrar()
        let opcaoAcomodacao = this.entrada.receberNumero('Qual tipo de acomodação?')
        tipoAcomodacao = this.acomodacoes[opcaoAcomodacao - 1].NomeAcomadacao
        
        let clienteTitular = todosClientesTitulares[0]

        let menuEscolherTitular = new MenuEscolherCliente(todosClientesTitulares)
        menuEscolherTitular.mostrar()
        let opcaoTitular = this.entrada.receberNumero('Qual cliente será o titular?')
        clienteTitular = todosClientesTitulares[opcaoTitular - 1]

        let escolhendoDependentes = true
        let clientesDependentes = []

        console.log("Escolha os dependentes que estarão junto com o titular:")
        while(escolhendoDependentes){
            let menuEscolherTitular = new MenuEscolherCliente(clienteTitular!.Dependentes)
            menuEscolherTitular.mostrar()
            let opcaoDep = this.entrada.receberNumero('Qual cliente será o titular?')
            let clienteDependente = todosClientesTitulares[opcaoDep - 1]
            if(opcaoDep == 0){
                escolhendoDependentes = false
            }else if(!clienteTitular){
                console.log("Cliente não encontrado")
            }else{
                clientesDependentes.push(clienteDependente)
                console.log("Cliente dependente adicionado!")
            }    
        }

        let dataEntrada = this.entrada.receberData('Qual será data de entrada?')
        let dias = this.entrada.receberNumero('Qual é a quantidade total de dias de estadia?')

        return {tipoAcomodacao, clienteTitular, clientesDependentes, dataEntrada, dias}
    }

}