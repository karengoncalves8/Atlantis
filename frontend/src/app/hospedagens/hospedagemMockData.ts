import { NomeAcomadacao } from "@/enums/NomeAcomadacao";
import { TipoDocumento } from "@/enums/tipoDocumento";
import Cliente from "@/interfaces/cliente";
import { Hospedagem } from "@/interfaces/hospedagem";

// Mock de Clientes
const cliente1: Cliente = {
  nome: "João Silva",
  nomeSocial: "Joãozinho",
  dataNascimento: new Date("1990-05-10"),
  dataCadastro: new Date("2020-01-01"),
  telefones: [{ ddd: "11", numero: "987654321" }],
  endereco: {
    rua: "Rua das Flores",
    bairro: "Centro",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
    codigoPostal: "12345-678",
  },
  documentos: [
    { numero: "123.456.789-00", tipo: TipoDocumento.CPF, dataExpedicao: new Date("2010-05-10") },
    { numero: "12.345.678-9", tipo: TipoDocumento.RG, dataExpedicao: new Date("2005-08-15") },
  ],
  dependentes: [],
  titular: undefined,
};

const cliente2: Cliente = {
  nome: "Maria Oliveira",
  nomeSocial: "Mari",
  dataNascimento: new Date("1985-03-15"),
  dataCadastro: new Date("2015-06-25"),
  telefones: [{ ddd: "11", numero: "912345678" }],
  endereco: {
    rua: "Rua dos Jacarandás",
    bairro: "Vila Mariana",
    cidade: "São Paulo",
    estado: "SP",
    pais: "Brasil",
    codigoPostal: "98765-432",
  },
  documentos: [
    { numero: "234.567.890-01", tipo: TipoDocumento.CPF, dataExpedicao: new Date("2012-03-10") },
    { numero: "34.567.890-1", tipo: TipoDocumento.RG, dataExpedicao: new Date("2008-12-20") },
  ],
  dependentes: [],
  titular: undefined,
};

// Dados mockados para 5 hospedagens
export const mockHospedagens: Hospedagem[] = [
  {
    tipoAcomodacao: NomeAcomadacao.FamilaSimples,
    clienteTitular: cliente1,
    clientesDependentes: [cliente2],
    dataEntrada: new Date("2025-06-01"),
    dataSaida: new Date("2025-06-10"),
    dias: 9,
  },
  {
    tipoAcomodacao: NomeAcomadacao.CasalSimples,
    clienteTitular: cliente2,
    clientesDependentes: [cliente1],
    dataEntrada: new Date("2025-07-01"),
    dataSaida: new Date("2025-07-15"),
    dias: 14,
  },
  {
    tipoAcomodacao: NomeAcomadacao.FamiliaSuper,
    clienteTitular: cliente1,
    clientesDependentes: [],
    dataEntrada: new Date("2025-08-01"),
    dataSaida: new Date("2025-08-05"),
    dias: 4,
  },
  {
    tipoAcomodacao: NomeAcomadacao.SolteiroSimples,
    clienteTitular: cliente2,
    clientesDependentes: [],
    dataEntrada: new Date("2025-09-01"),
    dataSaida: new Date("2025-09-07"),
    dias: 6,
  },
  {
    tipoAcomodacao: NomeAcomadacao.FamiliaMais,
    clienteTitular: cliente1,
    clientesDependentes: [cliente2],
    dataEntrada: new Date("2025-10-01"),
    dataSaida: new Date("2025-10-10"),
    dias: 9,
  },
];
