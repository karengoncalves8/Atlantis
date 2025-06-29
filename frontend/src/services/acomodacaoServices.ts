import Cliente from "@/interfaces/cliente"
import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"
import { Acomodacao } from "@/interfaces/acomodacao"

const getAllAcomodacao = async (): Promise<Acomodacao[] | ApiException> => {
  try{
    const { data } = await Api().get('/acomodacao')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

export const acomodacaoServices = {
  getAllAcomodacao,
}