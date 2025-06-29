import Cliente from "@/interfaces/cliente"
import { Api } from "../config/api"
import { ApiException } from "../config/apiConfig"

const getAllClientes = async (): Promise<Cliente[] | ApiException> => {
  try{
    const { data } = await Api().get('/cliente')
    return data
  } catch(error: any){
    return new ApiException(error.message || 'Erro ao consultar a API.')
  }
}

const createCliente = async (cliente: any): Promise<Cliente | ApiException> => {
  try {
    const { data } = await Api().post<any>('/cliente', cliente, {
      headers: { 'Content-Type': 'application/json' }
    })

    const cliente_criado: Cliente = data
    return cliente_criado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const updateCliente = async (id:number, cliente: any): Promise<Cliente | ApiException> => {
  try {
    const { data } = await Api().put<any>(`/cliente/${id}`, cliente, {
      headers: { 'Content-Type': 'application/json' }
    });

    const cliente_atualizado: Cliente = data
    return cliente_atualizado

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const getClienteByID = async (id: number): Promise<Cliente | ApiException> => {
  try {
    const { data } = await Api().get<any>(`/cliente/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    const cliente: Cliente = data;
    return cliente

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}

const deleteCliente = async (id: number): Promise<any | ApiException> => {
  try {
    const { data } = await Api().delete<any>(`/cliente/${id}`, {
      headers: { 'Content-Type': 'application/json' }
    })

    return data

  } catch (error: any) {
    return new ApiException(error.message || 'Erro ao criar o registro.')
  }
}


export const clienteServices = {
  getAllClientes,
  createCliente,
  getClienteByID,
  updateCliente,
  deleteCliente
}