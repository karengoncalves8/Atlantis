import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"
import { NomeAcomadacao } from "@/interfaces/acomodacao"

const getAllNomeAcomodacao = async (): Promise<NomeAcomadacao[] | ApiException> => {
  try{
    const { data } = await Api().get('/nome-acomodacao')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

export const nomeAcomodacaoServices = {
  getAllNomeAcomodacao,
}