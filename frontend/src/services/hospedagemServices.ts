
import { Hospedagem } from "@/interfaces/hospedagem"
import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"

const getAllHospedagens = async (): Promise<Hospedagem[] | ApiException> => {
  try{
    const { data } = await Api().get('/hospedagem')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

const createHospedagem = async (hospedagem: any): Promise<Hospedagem | ApiException> => {
  try {
    const { data } = await Api().post<any>('/hospedagem', hospedagem, {
      headers: { 'Content-Type': 'application/json' }
    })

    const cliente_criado: Hospedagem = data
    return cliente_criado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}


export const hospedagemServices = {
  getAllHospedagens,
  createHospedagem,
}