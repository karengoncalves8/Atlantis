// import Processo from "../../abstracoes/processo"
// import Armazem from "../../dominio/armazem"
// import Cliente from "../../modelos/cliente"
// import CadastrarDocumentosCliente from "./cadastrarDocumentosCliente"
// import CadastrarTelefonesCliente from "./cadastrarTelefonesCliente"
// import CadastroEnderecoTitular from "./cadastroEnderecoTitular"


// export default class EditarClienteTitular extends Processo {
//     processar(): void {

//         let nome = this.entrada.receberTexto('Qual o nome do novo cliente?')
//         let nomeSocial = this.entrada.receberTexto('Qual o nome social do novo cliente?')
//         let dataNascimento = this.entrada.receberData('Qual a data de nascimento?')
//         let cliente = new Cliente(nome, nomeSocial, dataNascimento)

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