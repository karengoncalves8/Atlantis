"use client"

import { useEffect, useState } from "react";

// interfaces
import { TipoDocumento } from "@/enums/tipoDocumento";
import Cliente from "@/interfaces/cliente";

// Components
import Card from "@/components/card";
import { DataTable } from "@/components/ui/datatable";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "@/components/modal";

// icons
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { columnsHospedagem } from "./hospedagemColumns";
import { Hospedagem } from "@/interfaces/hospedagem";
import { HospedagemForm } from "@/components/hospedagemForm";
import { Acomodacao, NomeAcomadacao } from "@/interfaces/acomodacao";
import { clienteServices } from "@/services/clienteServices";
import { hospedagemServices } from "@/services/hospedagemServices";
import { acomodacaoServices } from "@/services/acomodacaoServices";
import { nomeAcomodacaoServices } from "@/services/nomeAcomodacaoServices";
import { ApiException } from "@/config/apiConfig";

// Data

export default function Hospedagens() {
	const [clientes, setClientes] = useState<Cliente[] | null>(null);
	const [acomodacoes, setAcomodacoes] = useState<NomeAcomadacao[] | null>(null);
	const [hospedagens, setHospedagens] = useState<Hospedagem[] | null>(null);

	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [showCadastroModal, setShowCadastroModal] = useState(false);

	const fetchClientes = async () => {
		try{
			const data = await clienteServices.getAllClientes();
			if (data instanceof ApiException) {
				console.error("Erro ao carregar clientes:", data.message);
				return;
			}
			// Filtrar apenas clientes titulares (que não são dependentes)
			const clientesTitulares = (data as Cliente[]).filter(cliente => !cliente.titularId);
			setClientes(clientesTitulares);
		}catch (err) {
			console.error("Erro ao carregar os clientes");
		}
	}

	const fetchHospedagens = async () => {
		try{
			const data = await hospedagemServices.getAllHospedagens();
			if (data instanceof ApiException) {
				console.error("Erro ao carregar hospedagens:", data.message);
				return;
			}
			setHospedagens(data as Hospedagem[]);	
			setIsLoading(false);
		}catch (err) {
			console.error("Erro ao carregar as hospedagens");
		}
	}

	const fetchAcomodacoes = async () => {
		try{
			const data = await acomodacaoServices.getAllAcomodacao();
			if (data instanceof ApiException) {
				console.error("Erro ao carregar acomodações:", data.message);
				return;
			}

			const acomodacoesDisponiveis = data.filter((acomodacao) => acomodacao.quantidadeDisponivel > 0);
			const nomeAcomodacoes = acomodacoesDisponiveis.map((acomodacao)=> { return acomodacao.nomeAcomadacao})
			setAcomodacoes(nomeAcomodacoes);
		}catch (err) {
			console.error("Erro ao carregar as acomodações");
		}
	}

	useEffect(() => {
		fetchClientes()
		fetchAcomodacoes()
		fetchHospedagens()
	}, [])

	const handleCadastro = async (data: any) => {
		setIsSubmitting(true);
		try {
			// Preparar dados conforme esperado pelo backend
			const hospedagemData = {
				tipoAcomadacaoId: data.tipoAcomodacao.id,
				clienteTitularId: data.clienteTitular.id,
				clientesDependentes: [], // Por enquanto vazio, pode ser expandido depois
				dataEntrada: data.dataEntrada,
				dataSaida: data.dataSaida,
				dias: data.dias
			};

			const result = await hospedagemServices.createHospedagem(hospedagemData);
			
			if (result instanceof ApiException) {
				console.error("Erro ao criar hospedagem:", result.message);
				alert("Erro ao criar hospedagem: " + result.message);
				return;
			}
			
			console.log('Hospedagem criada com sucesso:', result);
			setShowCadastroModal(false);
			
			// Recarrega a lista de hospedagens
			await fetchHospedagens();
			
		} catch (error) {
			console.error("Erro ao criar hospedagem:", error);
			alert("Erro ao criar hospedagem");
		} finally {
			setIsSubmitting(false);
		}
  };

	return (
		<>

			{isLoading ? (
				<span>Carregando...</span>
			) : (
				<>
					<div className="flex w-full items-center justify-between">
						<h2>Hospedagens</h2>
						<Button className="text-lg font-bold" onClick={() => setShowCadastroModal(true)}> 
							<FontAwesomeIcon icon={faPlusCircle} className="text-black-600" /> Adicionar 
						</Button>
					</div>
					
					<Card className="w-full h-[35rem]">
						<DataTable 
							columns={columnsHospedagem} 
							data={hospedagens!} 
							showSearchBar={true}
							filterColumns={['cliente']} 
							title={''}
						/>
					</Card>
				</>

			)}
			
			{showCadastroModal && (
				<Modal 
				title="Cadastrar Nova Hospedagem" 
				onAction={() => {}} 
				closeModal={() => setShowCadastroModal(false)}
				>
				<HospedagemForm 
					clientesDisponiveis={clientes!}
					onSubmit={handleCadastro}
					nomeAcomodacoes={acomodacoes!}
				/>
				<div className="flex justify-end space-x-2 mt-6">
					<Button 
					type="button" 
					variant="outline" 
					onClick={() => setShowCadastroModal(false)}
					disabled={isSubmitting}
					>
					Cancelar
					</Button>
					<Button 
						type="submit" 
						form="hospedagem-form"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Cadastrando..." : "Cadastrar Hospedagem"}
					</Button>
				</div>
				</Modal>
			)}
		</>
	);
}