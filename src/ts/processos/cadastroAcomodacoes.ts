import Processo from "../abstracoes/processo";
import DiretorCasalSimples from "../diretores/diretorCasalSimples";
import DiretorFamiliaMais from "../diretores/diretorFamiliaMais";
import DiretorFamiliaSimples from "../diretores/diretorFamiliaSimples";
import DiretorFamiliaSuper from "../diretores/diretorFamiliaSuper";
import DiretorSolteiroMais from "../diretores/diretorSolteiroMais";
import DiretorSolteiroSimples from "../diretores/diretorSolteiroSimples";
import Armazem from "../dominio/armazem";
import Acomodacao from "../modelos/acomodacao";

export default class CadastroAcomodacoes extends Processo {
    private acomodacoes: Acomodacao[]
    constructor() {
        super()
        this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes
    }
    processar(): void {
        let diretorSolteiroSimples = new DiretorSolteiroSimples().construir()
        let diretorSolteiroMais = new DiretorSolteiroMais().construir()
        let diretorFamiliaSimples = new DiretorFamiliaSimples().construir()
        let diretorFamiliaSuper = new DiretorFamiliaSuper().construir()
        let diretorFamiliaMais = new DiretorFamiliaMais().construir()
        let diretorCasalSimples = new DiretorCasalSimples().construir()

        this.acomodacoes.push(diretorSolteiroSimples, diretorSolteiroMais, diretorFamiliaSimples, diretorFamiliaSuper, diretorFamiliaMais, diretorCasalSimples)
    }
}