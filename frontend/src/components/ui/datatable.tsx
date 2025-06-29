"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal, TableRowsSplitIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import InputBusca from "../inputBusca"

// Defina as propriedades que o componente genérico vai receber
interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    filterColumns: string[];  
    title: string;
    showSearchBar?: boolean;
}

export function DataTable<TData, TValue>({ data, columns, filterColumns, title, showSearchBar = true }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({usuarioCod: false, dataMes: false})
  const [rowSelection, setRowSelection] = React.useState({})
  const [filterValue, setFilterValue] = React.useState<string>("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(event.target.value);
    setColumnFilters((prevFilters) => [
      {
        id: filterColumns[0], 
        value: event.target.value,
      },
    ]);
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <div className="flex items-center gap-4 justify-end py-4">
          {showSearchBar && 
            <InputBusca
              value={filterValue}
              onChange={handleFilterChange}
              placeholder="Buscar..."
            />
          }
          
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white text-base">
                  Colunas <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id.replace(/([a-z])([A-Z])/g, '$1 $2')}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
      </div>
      
      <div className="hidden md:block">
        <Table className="min-w-[900px] w-full h-full">
          <TableHeader className="bg-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-inherit">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="border border-gray-200 text-center font-bold text-black text-base p-4">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className={"bg-[#FFFFFF] hover:bg-[#9ADBE8]"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="border border-gray-200 text-black text-base p-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col p-5 w-full justify-center items-center">
                    <img src="/images/sem_conteudo.svg" alt="" style={{width: "30rem", height: "20rem"}}/>
                    <p className="font-medium">Ops! Parece que não tem nada aqui!</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="overflow-x-auto block md:hidden">
        <Table className="min-w-[900px] w-full">
          <TableBody>
            {table.getHeaderGroups().map((headerGroup) => (
              headerGroup.headers.map((header, idx) => (
                <TableRow key={header.id} className={idx % 2 === 0 ? "bg-[#FFF8E1]" : "bg-[#FFFFFF]"}>
                  <TableCell key={`header-${header.id}`} className="border border-gray-200 text-center font-bold text-black text-base p-4">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableCell>

                  {/* Para cada linha de dados, renderiza o valor correspondente para essa coluna */}
                  {table.getRowModel().rows.map((row) => (
                    <TableCell key={`cell-${row.id}-${idx}`} className="border border-gray-200 text-black text-base p-3">
                      {flexRender(row.getVisibleCells()[idx].column.columnDef.cell, row.getVisibleCells()[idx].getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ))}

            {table.getRowModel().rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  <div className="flex flex-col p-3 w-full justify-center items-center">
                    <p className="font-medium">Ops! Parece que não tem nada aqui!</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  )
}