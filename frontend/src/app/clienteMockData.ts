import { TipoDocumento } from "@/enums/tipoDocumento";
import Cliente from "@/interfaces/cliente";

export const mockClientes: Cliente[] = [
	{
		nome: "João Silva",
		nomeSocial: "Joãozinho",
		dataNascimento: new Date("1990-05-10"),
		dataCadastro: new Date("2020-01-01"),
		telefones: [
		{ ddd: "11", numero: "987654321" },
		{ ddd: "21", numero: "998877665" }
		],
		endereco: {
		rua: "Rua das Flores",
		bairro: "Centro",
		cidade: "São Paulo",
		estado: "SP",
		pais: "Brasil",
		codigoPostal: "12345-678"
		},
		documentos: [
		{
			numero: "123.456.789-00",
			tipo: TipoDocumento.CPF,
			dataExpedicao: new Date("2010-05-10")
		},
		{
			numero: "12.345.678-9",
			tipo: TipoDocumento.RG,
			dataExpedicao: new Date("2005-08-15")
		}
		],
		dependentes: [],
		titular: undefined
	},
	{
		nome: "Maria Oliveira",
		nomeSocial: "Mari",
		dataNascimento: new Date("1985-03-15"),
		dataCadastro: new Date("2015-06-25"),
		telefones: [
		{ ddd: "11", numero: "912345678" },
		{ ddd: "41", numero: "999876543" }
		],
		endereco: {
		rua: "Rua dos Jacarandás",
		bairro: "Vila Mariana",
		cidade: "São Paulo",
		estado: "SP",
		pais: "Brasil",
		codigoPostal: "98765-432"
		},
		documentos: [
		{
			numero: "234.567.890-01",
			tipo: TipoDocumento.CPF,
			dataExpedicao: new Date("2012-03-10")
		},
		{
			numero: "34.567.890-1",
			tipo: TipoDocumento.RG,
			dataExpedicao: new Date("2008-12-20")
		}
		],
		dependentes: [],
		titular: undefined
	},
	{
		nome: "Carlos Souza",
		nomeSocial: "Carlito",
		dataNascimento: new Date("1995-07-25"),
		dataCadastro: new Date("2018-09-10"),
		telefones: [
		{ ddd: "21", numero: "975312468" },
		{ ddd: "11", numero: "976543210" }
		],
		endereco: {
		rua: "Avenida Paulista",
		bairro: "Bela Vista",
		cidade: "São Paulo",
		estado: "SP",
		pais: "Brasil",
		codigoPostal: "01310-200"
		},
		documentos: [
		{
			numero: "345.678.901-23",
			tipo: TipoDocumento.CPF,
			dataExpedicao: new Date("2016-04-10")
		},
		{
			numero: "45.678.901-2",
			tipo: TipoDocumento.RG,
			dataExpedicao: new Date("2012-08-01")
		}
		],
		dependentes: [],
		titular: undefined
	},
	{
		nome: "Ana Costa",
		nomeSocial: "Aninha",
		dataNascimento: new Date("1992-12-05"),
		dataCadastro: new Date("2017-02-10"),
		telefones: [
		{ ddd: "41", numero: "984561234" },
		{ ddd: "51", numero: "991234567" }
		],
		endereco: {
		rua: "Rua do Sol",
		bairro: "Porto Alegre",
		cidade: "Porto Alegre",
		estado: "RS",
		pais: "Brasil",
		codigoPostal: "90000-000"
		},
		documentos: [
		{
			numero: "456.789.012-34",
			tipo: TipoDocumento.CPF,
			dataExpedicao: new Date("2014-11-15")
		},
		{
			numero: "56.789.012-3",
			tipo: TipoDocumento.RG,
			dataExpedicao: new Date("2011-05-20")
		}
		],
		dependentes: [],
		titular: undefined
	},
	{
		nome: "Ricardo Lima",
		nomeSocial: "Ricardinho",
		dataNascimento: new Date("1988-08-30"),
		dataCadastro: new Date("2012-12-15"),
		telefones: [
		{ ddd: "61", numero: "999988877" },
		{ ddd: "11", numero: "911223344" }
		],
		endereco: {
		rua: "Rua 7 de Setembro",
		bairro: "Centro",
		cidade: "Brasília",
		estado: "DF",
		pais: "Brasil",
		codigoPostal: "70000-000"
		},
		documentos: [
		{
			numero: "567.890.123-45",
			tipo: TipoDocumento.CPF,
			dataExpedicao: new Date("2010-01-10")
		},
		{
			numero: "67.890.123-4",
			tipo: TipoDocumento.RG,
			dataExpedicao: new Date("2006-03-30")
		}
		],
		dependentes: [],
		titular: undefined
	}
];


