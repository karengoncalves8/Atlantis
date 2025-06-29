"use client"

import { useState } from "react";

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
import { mockClientes } from "./clienteMockData";
import { columnsCliente } from "./clientsColumns";

export default function Home() {
	const [showEditModal, setShowEditModal] = useState(false);
	const [showCadastroModal, setShowCadastroModal] = useState(false);
	const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);

	const handleEditCliente = (cliente: Cliente) => {
		setSelectedCliente(cliente);
		setShowEditModal(true);
	};

	const onSubmit = (data: any) => {
		console.log('Dados do formulário:', data);
		// Aqui você pode implementar a lógica para salvar as alterações
		setShowEditModal(false);
	};

	const handleCadastro = (data: any) => {
		console.log('Novo cliente:', data);
		// Aqui você implementaria a lógica para salvar o novo cliente
		setShowCadastroModal(false);
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
			<div className="flex w-full items-center justify-between">
				<h2>Clientes</h2>
				<Button className="text-lg font-bold" onClick={() => setShowCadastroModal(true)}> 
					<FontAwesomeIcon icon={faPlusCircle} className="text-black-600" /> Adicionar 
				</Button>
			</div>
			
			<Card className="w-full h-[35rem]">
				<DataTable 
					columns={adjustedColumnsCli} 
					data={mockClientes as Cliente[]} 
					showSearchBar={true}
					filterColumns={['nome']} 
					title={''}
				/>
			</Card>

			{showCadastroModal && (
				<Modal 
				title="Cadastrar Novo Cliente" 
				onAction={() => {}} 
				closeModal={() => setShowCadastroModal(false)}
				>
				<ClienteForm 
					onSubmit={handleCadastro} 
					isEditMode={false}
				/>
				<div className="flex justify-end space-x-2 mt-6">
					<Button 
					type="button" 
					variant="outline" 
					onClick={() => setShowCadastroModal(false)}
					>
					Cancelar
					</Button>
					<Button type="submit" form="cliente-form">
					Cadastrar Cliente
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
						<Button type="button" variant="outline" onClick={() => setShowEditModal(false)}>
							Cancelar
						</Button>
						<Button type="submit" form="cliente-form">
							Salvar Alterações
						</Button>
					</div>
				</Modal>
			}
		</>
	);
}