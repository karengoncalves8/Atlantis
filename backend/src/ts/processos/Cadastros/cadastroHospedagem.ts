import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import Hospedagem from "../../modelos/hospedagem";
import ReceberDadosHospedagem from "../ReceberInformações/receberDadosHospedagem";

export default class CadastroHospedagem extends Processo {
    processar(): void {
        console.log("Iniciando o cadastro de uma nova hospedagem...")

       let receberDadosBasicos = new ReceberDadosHospedagem() 
       let dadosBasicos = receberDadosBasicos.processar()
       
        let hospedagem = new Hospedagem(dadosBasicos.tipoAcomodacao, dadosBasicos.clienteTitular, dadosBasicos.clientesDependentes, dadosBasicos.dataEntrada, dadosBasicos.dias)

        let armazem = Armazem.InstanciaUnica
        armazem.Hospedagens.push(hospedagem)

        let acomodacaoSelecionada = armazem.Acomodacoes.find((acomodacao) => acomodacao.NomeAcomadacao == hospedagem.TipoAcomodacao)
        
        if(acomodacaoSelecionada){
            acomodacaoSelecionada.QuantidadeDisponivel -= 1
        }

        console.log("Hospedagem realizada com sucesso!")
    }
}