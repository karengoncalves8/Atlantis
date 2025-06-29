import Impressor from "../interfaces/impressor";
import Hospedagem from "../modelos/hospedagem";

export default class ImpressorHospedagem implements Impressor {
    private hospedagem: Hospedagem
    constructor(hospedagem: Hospedagem) {
        this.hospedagem = hospedagem
    }
    imprimir(): string {
        let descricao = `Tipo de acomodação: ${this.hospedagem.TipoAcomodacao.toString()}\n`
            + `-- Cliente titular: ${this.hospedagem.ClienteTitular.Nome}\n`
            + `-- Clientes dependentes:\n`;

        this.hospedagem.ClientesDependentes.forEach(cli_dep => {
            descricao += `---- ${cli_dep.Nome}\n`; 
        });

        descricao += `-- Data de entrada: ${this.hospedagem.DataEntrada.toLocaleDateString()}\n`
            + `-- Data de saída: ${this.hospedagem.DataSaida}\n`
            + `-- Dias de estadia: ${this.hospedagem.Dias}\n`;

        return descricao;
    }
}