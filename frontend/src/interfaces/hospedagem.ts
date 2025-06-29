import { NomeAcomadacao } from "@/enums/NomeAcomadacao";
import Cliente from "./cliente";

export interface Hospedagem {
  tipoAcomodacao: NomeAcomadacao; // Tipo de acomodação
  clienteTitular: Cliente; // Cliente titular
  clientesDependentes: Cliente[]; // Lista de dependentes
  dataEntrada: Date; // Data de entrada
  dataSaida: Date; // Data de saída
  dias: number; // Número de dias de estadia
}