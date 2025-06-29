"use client"

// Interfaces
import Cliente from "@/interfaces/cliente"

// Componentes
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Hospedagem } from "@/interfaces/hospedagem"
import { NomeAcomadacao } from "@/interfaces/acomodacao"


export const columnsHospedagem: ColumnDef<Hospedagem>[] = [
  {
    accessorKey: "tipoAcomadacao",
    header: "Tipo de Acomodação",
    cell: ({ row }) => {
      const value = row.getValue("tipoAcomadacao") as NomeAcomadacao;
      if (!value) return <div className="text-center">-</div>;
      return <div className="text-center">{value.nome}</div>
    }
  },
  {
    accessorKey: "clienteTitular",
    header: "Cliente Titular",
    cell: ({ row }) => {
      const value = row.getValue("clienteTitular") as Cliente;
      if (!value) return <div className="text-center">-</div>;
      return <div className="text-center">{value.nome}</div>
    }
  },
  {
    accessorKey: "dataEntrada",
    header: "Data de Entrada",
    cell: ({ row }) => {
      const value = row.getValue("dataEntrada") as Date;
      if (!value) return <div className="text-center">-</div>;

      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(new Date(value));
      return <div className="text-center">{formattedDate}</div>
    }
  },
  {
    accessorKey: "dataSaida",
    header: "Data de Saída",
    cell: ({ row }) => {
      const value = row.getValue("dataSaida") as Date;
      if (!value) return <div className="text-center">-</div>;

      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(new Date(value));
      return <div className="text-center">{formattedDate}</div>
    }
  },
  {
    accessorKey: "dias",
    header: "Dias de Estadia",
    cell: ({ row }) => {
      const value = row.getValue("dias") as number;
      return <div className="text-center">{value}</div>
    }
  },
]
