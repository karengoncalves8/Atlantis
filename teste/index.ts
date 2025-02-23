import { TipoDocumento } from "../enumeracoes/tipoDocumento";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";

// Novo cliete - principal
let cliente = new Cliente()

cliente.nome = `Pedro de Alcântara João Carlos Leopoldo Salvador`
cliente.nomeSocial = `Dom Pedro II`
cliente.dataCadastro = new Date(1840, 6, 23)
cliente.dataNascimento = new Date(1825, 11, 2)

let endereco = new Endereco()
endereco.rua = `R. do Catete`
endereco.bairro = `Copacabana`
endereco.cidade = `Rio de Janeiro`
endereco.estado = `Rio de Janeiro`
endereco.pais = `Brasil`
endereco.codigoPostal = `22220-000`
cliente.endereco = endereco

let documento = new Documento()
documento.dataExpedicao = new Date(2021, 7, 21)
documento.numero = '423.345.234-54'
documento.tipo = TipoDocumento.CPF
cliente.documentos.push(documento)

let telefone = new Telefone()
telefone.ddd = '12'
telefone.numero = '99845-3521'
cliente.telefones.push(telefone)
let telefone2 = new Telefone()
telefone2.ddd = '13'
telefone2.numero = '75684-3521'
cliente.telefones.push(telefone)


// Novo cliente - Dependente do cliente principal
let dependente = new Cliente()

dependente.nome = `Isabel Cristina Leopoldina Augusta Micaela`
dependente.nomeSocial = `Princesa Isabel`
dependente.dataCadastro = new Date(1921, 10, 14)
dependente.dataNascimento = new Date(1846, 6, 29)
dependente.endereco = (cliente.endereco.clonar() as Endereco)
dependente.telefones.push(...cliente.telefones.map((telefone) => telefone.clonar() as Telefone))

dependente.titular = cliente
cliente.dependentes.push(dependente)

console.log(cliente);
console.log(dependente);
