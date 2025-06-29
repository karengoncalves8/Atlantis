import { TipoDocumento } from "@/enums/tipoDocumento";

interface Telefone {
	id?: number
	ddd: string;
	numero: string; 
}

interface Endereco {
	id?: number
	rua: string;
	bairro: string;
	cidade: string;
	estado: string;
	pais: string;
	codigoPostal: string;
}

interface Documento {
	id?: number
    numero: string
    tipo: TipoDocumento
    dataExpedicao: Date
}

export default interface Cliente {
    id?: number
	nome: string;
	nomeSocial: string;
	dataNascimento: Date;
	dataCadastro: Date;
	titularId?: number;
	telefones: Telefone[];
	endereco: Endereco;
	documentos: Documento[];
	dependentes?: Cliente[];
	titular?: Cliente;
}