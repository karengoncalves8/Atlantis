import { TipoDocumento } from "@/enums/tipoDocumento";

interface Telefone {
  ddd: string;
  numero: string; 
}

interface Endereco {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  codigoPostal: string;
}

interface Documento {
    numero: string
    tipo: TipoDocumento
    dataExpedicao: Date
}

export default interface Cliente {
  nome: string;
  nomeSocial: string;
  dataNascimento: Date;
  dataCadastro: Date;
  telefones: Telefone[];
  endereco: Endereco;
  documentos: Documento[];
  dependentes?: Cliente[];
  titular?: Cliente;
}