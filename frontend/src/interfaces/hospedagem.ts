import { NomeAcomadacao } from "./acomodacao";
import Cliente from "./cliente";

export interface Hospedagem {
    tipoAcomadacao: NomeAcomadacao; 
    clienteTitular: Cliente; // Cliente titular
    dataEntrada: Date; // Data de entrada
    dataSaida: Date; // Data de saída
    dias: number; // Número de dias de estadia
}