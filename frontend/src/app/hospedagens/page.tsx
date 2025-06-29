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

// icons
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { columnsHospedagem } from "./hospedagemColumns";
import { mockHospedagens } from "./hospedagemMockData";
import { Hospedagem } from "@/interfaces/hospedagem";
import { HospedagemForm } from "@/components/hospedagemForm";
import { mockClientes } from "../clienteMockData";

// Data

export default function Hospedagens() {
	const [showCadastroModal, setShowCadastroModal] = useState(false);

	const handleCadastro = (data: any) => {
		console.log('Nova hospedagem:', data);
		setShowCadastroModal(false);
  };

	return (
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
					data={mockHospedagens as Hospedagem[]} 
					showSearchBar={true}
					filterColumns={['cliente']} 
					title={''}
				/>
			</Card>

			{showCadastroModal && (
				<Modal 
				title="Cadastrar Nova Hospedagem" 
				onAction={() => {}} 
				closeModal={() => setShowCadastroModal(false)}
				>
				<HospedagemForm 
					clientesDisponiveis={mockClientes}
					onSubmit={handleCadastro}
				/>
				<div className="flex justify-end space-x-2 mt-6">
					<Button 
					type="button" 
					variant="outline" 
					onClick={() => setShowCadastroModal(false)}
					>
					Cancelar
					</Button>
					<Button type="submit" form="hospedagem-form">
					Cadastrar Hospedagem
					</Button>
				</div>
				</Modal>
			)}
		</>
	);
}