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
import { ClienteForm } from "@/components/clienteForm";

// icons
import { faEye, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

// Data
import { columnsCliente } from "./clientsColumns";
import { ApiException } from "@/config/apiConfig";
import { clienteServices } from "@/services/clienteServices";

export default function Home() {
	const [clientes, setClientes] = useState<Cliente[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const [showEditModal, setShowEditModal] = useState(false);
	const [showCadastroModal, setShowCadastroModal] = useState(false);
	const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

	const fetchClientes = async () => {
        try{
            const data = await clienteServices.getAllClientes();
            if (data instanceof ApiException) {
                console.error("Erro ao carregar clientes:", data.message);
                return;
            }
            setClientes(data as Cliente[]);
            setIsLoading(false);
        }catch (err) {
           console.error("Erro ao carregar os clientes");
        }
    }

	useEffect(() => {
		fetchClientes()
	}, [])

	const handleEditCliente = (cliente: Cliente) => {
		setSelectedCliente(cliente);
		setShowEditModal(true);
	};

	const onSubmit = async (data: any) => {
		if (!selectedCliente || !selectedCliente.id) return;
		
		setIsSubmitting(true);
		try {
			const result = await clienteServices.updateCliente(selectedCliente.id, data);
			
			if (result instanceof ApiException) {
				console.error("Erro ao atualizar cliente:", result.message);
				alert("Erro ao atualizar cliente: " + result.message);
				return;
			}
			
			console.log('Cliente atualizado com sucesso:', result);
			setShowEditModal(false);
			setSelectedCliente(null);
			
			// Recarrega a lista de clientes
			await fetchClientes();
			
		} catch (error) {
			console.error("Erro ao atualizar cliente:", error);
			alert("Erro ao atualizar cliente");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleCadastro = async (data: any) => {
		setIsSubmitting(true);
		try {
			const result = await clienteServices.createCliente(data);
			
			if (result instanceof ApiException) {
				console.error("Erro ao criar cliente:", result.message);
				alert("Erro ao criar cliente: " + result.message);
				return;
			}
			
			console.log('Cliente criado com sucesso:', result);
			setShowCadastroModal(false);
			
			// Recarrega a lista de clientes
			await fetchClientes();
			
		} catch (error) {
			console.error("Erro ao criar cliente:", error);
			alert("Erro ao criar cliente");
		} finally {
			setIsSubmitting(false);
		}
  };

	const adjustedColumnsCli = columnsCliente.map((column) => {
		if (column.id === "acoes") {
			column.cell = ({ row }) => {
				const cliente = row.original as Cliente;
				
				return (
					<div className="flex space-x-2 justify-center">
						<Button onClick={() => handleEditCliente(cliente)}>
							<FontAwesomeIcon icon={faEye} className="text-black-600" />
						</Button>
					</div>
				);
			};
		}
		return column;
	});

	return (
		<>
			{isLoading ? 
				( 
					<span> Carregando ... </span>
				) : 
				(
					<> 
						<div className="flex w-full items-center justify-between">
							<h2>Clientes</h2>
							<Button className="text-lg font-bold" onClick={() => setShowCadastroModal(true)}> 
								<FontAwesomeIcon icon={faPlusCircle} className="text-black-600" /> Adicionar 
							</Button>
						</div>
						
						<Card className="w-full h-[35rem]">
							<DataTable 
								columns={adjustedColumnsCli} 
								data={clientes!} 
								showSearchBar={true}
								filterColumns={['nome']} 
								title={''}
							/>
						</Card>
					</>
				)
			}
			
			{showCadastroModal && (
				<Modal 
				title="Cadastrar Novo Cliente" 
				onAction={() => {}} 
				closeModal={() => setShowCadastroModal(false)}
				>
				<ClienteForm 
					onSubmit={handleCadastro} 
					isEditMode={false}
					clientesTitulares={clientes?.filter((cliente) => !cliente.titularId) || []}
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
						form="cliente-form"
						disabled={isSubmitting}
					>
						{isSubmitting ? "Cadastrando..." : "Cadastrar Cliente"}
					</Button>
				</div>
				</Modal>
			)}

			{showEditModal && 
				<Modal title="Editar Cliente" onAction={() => {}} closeModal={() => setShowEditModal(false)}>
					<ClienteForm 
						initialData={selectedCliente || undefined} 
						onSubmit={onSubmit} 
						isEditMode={true}
					/>
					<div className="flex justify-end space-x-2 mt-6">
						<Button 
							type="button" 
							variant="outline" 
							onClick={() => setShowEditModal(false)}
							disabled={isSubmitting}
						>
							Cancelar
						</Button>
						<Button 
							type="submit" 
							form="cliente-form"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Salvando..." : "Salvar Alterações"}
						</Button>
					</div>
				</Modal>
			}
		</>
	);
}