"use client"

// Interfaces
import Cliente from "@/interfaces/cliente"

// Componentes
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons";


export const columnsCliente: ColumnDef<Cliente>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "nomeSocial",
    header: "Nome Social",
  },
  {
    accessorKey: "dataCadastro",
    header: "Data de Cadastro",
    cell: ({ row }) => {
      let value = row.getValue("dataCadastro");
      if (!value) return <div className="text-center">-</div>;
      
      let date: Date;
      
      if (value instanceof Date) {
        date = value;
      } else if (typeof value === 'string') {
        const dateParts = value.split('-');
        date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), 1, 0, 0, 0);
      } else {
        return <div className="text-center">-</div>;
      }
      
      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date)
      return <div className="text-center capitalize">{formattedDate}</div>
    }
  },
  {
    accessorKey: "dataNascimento",
    header: "Data de Nascimento",
    cell: ({ row }) => {
      let value = row.getValue("dataNascimento");
      if (!value) return <div className="text-center">-</div>;
      
      let date: Date;
      
      if (value instanceof Date) {
        date = value;
      } else if (typeof value === 'string') {
        const dateParts = value.split('-');
        date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), 1, 0, 0, 0);
      } else {
        return <div className="text-center">-</div>;
      }
      
      const formattedDate = new Intl.DateTimeFormat('pt-BR').format(date)
      return <div className="text-center capitalize">{formattedDate}</div>
    }
  },
  {
    accessorKey: "telefones",
    header: "Telefones",
    cell: ({ row }) => {
      let value = row.getValue("telefones") as Cliente['telefones'];
      if (!value || value.length === 0) return <div className="text-center">-</div>;
      
      const telefonesFormatados = value.map(tel => `${tel.ddd} ${tel.numero}`).join(', ');
      return <div className="text-center">{telefonesFormatados}</div>
    }
  },
  {
    id: "acoes",
    header: "Ações",  
    cell: ({ row }) => (
      <div className="flex space-x-2 justify-center">
        <Button> <FontAwesomeIcon icon={faEye} className="text-black-600"/></Button>
      </div>
    ),
  },
]
