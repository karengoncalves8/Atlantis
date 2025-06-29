"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// interfaces

import Cliente from "@/interfaces/cliente";
import { NomeAcomadacao } from "@/interfaces/acomodacao";

// Components
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// icons
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const formSchema = z.object({
  tipoAcomodacao: z.object({
    id: z.number(),
    nome: z.string(),
    descricao: z.string()
  }, {
    message: "Tipo de acomodação é obrigatório.",
  }),
  clienteTitular: z.object({
    id: z.number(),
    nome: z.string(),
    nomeSocial: z.string()
  }).nullable(),
  dataEntrada: z.string().min(1, {
    message: "Data de entrada é obrigatória.",
  }),
  dataSaida: z.string().min(1, {
    message: "Data de saída é obrigatória.",
  }),
  dias: z.number().min(1, {
    message: "Número de dias deve ser maior que zero.",
  }),
})

type FormData = z.infer<typeof formSchema>

interface HospedagemFormProps {
  clientesDisponiveis: Cliente[];
  onSubmit: (data: FormData) => void;
  nomeAcomodacoes: NomeAcomadacao[];
}

export function HospedagemForm({ clientesDisponiveis, nomeAcomodacoes, onSubmit }: HospedagemFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      tipoAcomodacao: {
        id: 1,
        nome: "Solteiro Simples",
        descricao: "Acomodação simples para solteiro(a)"
      },
      clienteTitular: null,
      dataEntrada: "",
      dataSaida: "",
      dias: 1
    }
  });

  const handleSubmit = (data: FormData) => {
    if (!data.clienteTitular) {
      alert("Por favor, selecione um cliente titular");
      return;
    }
    onSubmit(data as any);
  };

  const calcularDias = () => {
    const dataEntrada = form.watch("dataEntrada");
    const dataSaida = form.watch("dataSaida");
    
    if (dataEntrada && dataSaida) {
      const entrada = new Date(dataEntrada);
      const saida = new Date(dataSaida);
      const diffTime = Math.abs(saida.getTime() - entrada.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      form.setValue("dias", diffDays);
    }
  };


  return (
    <Form {...form}>
      <form id="hospedagem-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 px-3 overflow-y-auto">
        {/* Tipo de Acomodação */}
        <FormField
          control={form.control}
          name="tipoAcomodacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Acomodação</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    const acomodacaoSelecionada = nomeAcomodacoes.find(a => a.id === parseInt(e.target.value));
                    field.onChange(acomodacaoSelecionada);
                  }}
                  value={field.value?.id || ""}
                >
                  {nomeAcomodacoes.map((nomeAcomodacao) => (
                    <option key={nomeAcomodacao.id} value={nomeAcomodacao.id}>
                      {nomeAcomodacao.nome}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Cliente Titular */}
        <FormField
          control={form.control}
          name="clienteTitular"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente Titular</FormLabel>
              <FormControl>
                <select 
                  className="w-full p-2 border rounded"
                  onChange={(e) => {
                    const clienteSelecionado = clientesDisponiveis.find(c => c.id === parseInt(e.target.value));
                    field.onChange(clienteSelecionado ? {
                      id: clienteSelecionado.id!,
                      nome: clienteSelecionado.nome,
                      nomeSocial: clienteSelecionado.nomeSocial
                    } : null);
                  }}
                  value={field.value?.id || ""}
                >
                  <option value="">Selecione um cliente</option>
                  {clientesDisponiveis.map((cliente) => (
                    <option key={cliente.id} value={cliente.id}>
                      {cliente.nome} - {cliente.nomeSocial}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Datas */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dataEntrada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Entrada</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      calcularDias();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="dataSaida"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Saída</FormLabel>
                <FormControl>
                  <Input 
                    type="date" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      calcularDias();
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Número de Dias */}
        <FormField
          control={form.control}
          name="dias"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Dias</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1"
                  {...field} 
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                />
              </FormControl>
              <FormDescription>
                Calculado automaticamente baseado nas datas de entrada e saída
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
} 