// import Processo from "../../abstracoes/processo"
// import Armazem from "../../dominio/armazem"
// import MenuEscolherCliente from "../../menus/menuEscolherCliente"
// import Cliente from "../../modelos/cliente"
// import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente"
// import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente"
// import CadastroEnderecoTitular from "./cadastroEnderecoTitular"


// export default class EditarClienteTitular extends Processo {
//     private clientes: Cliente[]

//     constructor() {
//         super()
//         this.clientes = Armazem.InstanciaUnica.Clientes.filter((cliente) => cliente.Titular == undefined)
//         this.menu = new MenuEscolherCliente(this.clientes)
//         this.execucao = true
//     }
    
//     processar(): void {
//         console.clear()

//         while (this.execucao) {
//             this.menu.mostrar()
//             this.opcao = this.entrada.receberNumero('Qual cliente deseja editar?')
//             let titular = this.clientes[this.opcao - 1]
//             if(this.opcao == 0){
//                 this.execucao = false
//             }
//             else if(titular){
//                 titular.Nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
//                 titular.NomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
//                 titular.DataNascimento = this.entrada.receberData('Qual a data de nascimento?')
//                 titular.Endereco.
//             }else{
//                 console.log('Cliente não encontrado')
//                 this.execucao = false
//             }
        
        

//         this.processo = new CadastroEnderecoTitular(cliente)
//         this.processo.processar()

//         this.processo = new CadastrarTelefonesCliente(cliente)
//         this.processo.processar()

//         this.processo = new CadastrarDocumentosCliente(cliente)
//         this.processo.processar()

//         let armazem = Armazem.InstanciaUnica
//         armazem.Clientes.push(cliente)

//         console.log('Finalizando o cadastro do cliente...')
//     }
// }