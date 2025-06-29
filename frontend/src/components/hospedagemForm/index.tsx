"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// interfaces
import { NomeAcomadacao } from "@/enums/NomeAcomadacao";
import Cliente from "@/interfaces/cliente";

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
  tipoAcomodacao: z.nativeEnum(NomeAcomadacao, {
    message: "Tipo de acomodação é obrigatório.",
  }),
  clienteTitular: z.object({
    nome: z.string().min(1, { message: "Cliente titular é obrigatório." }),
    nomeSocial: z.string(),
    dataNascimento: z.any(),
    dataCadastro: z.any(),
    telefones: z.array(z.object({
      ddd: z.string(),
      numero: z.string()
    })),
    endereco: z.object({
      rua: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      estado: z.string(),
      pais: z.string(),
      codigoPostal: z.string()
    }),
    documentos: z.array(z.object({
      numero: z.string(),
      tipo: z.any(),
      dataExpedicao: z.any()
    }))
  }).nullable(),
  clientesDependentes: z.array(z.object({
    nome: z.string().min(1, { message: "Cliente dependente é obrigatório." }),
    nomeSocial: z.string(),
    dataNascimento: z.any(),
    dataCadastro: z.any(),
    telefones: z.array(z.object({
      ddd: z.string(),
      numero: z.string()
    })),
    endereco: z.object({
      rua: z.string(),
      bairro: z.string(),
      cidade: z.string(),
      estado: z.string(),
      pais: z.string(),
      codigoPostal: z.string()
    }),
    documentos: z.array(z.object({
      numero: z.string(),
      tipo: z.any(),
      dataExpedicao: z.any()
    }))
  })),
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
}

export function HospedagemForm({ clientesDisponiveis, onSubmit }: HospedagemFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoAcomodacao: NomeAcomadacao.SolteiroSimples,
      clienteTitular: null,
      clientesDependentes: [],
      dataEntrada: "",
      dataSaida: "",
      dias: 1
    }
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
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

  const adicionarDependente = () => {
    const dependentesAtuais = form.getValues("clientesDependentes");
    if (clientesDisponiveis.length > 0) {
      form.setValue("clientesDependentes", [...dependentesAtuais, clientesDisponiveis[0]]);
    }
  };

  const removerDependente = (index: number) => {
    const dependentesAtuais = form.getValues("clientesDependentes");
    const novosDependentes = dependentesAtuais.filter((_, i) => i !== index);
    form.setValue("clientesDependentes", novosDependentes);
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
                <select {...field} className="w-full p-2 border rounded">
                  <option value={NomeAcomadacao.SolteiroSimples}>Acomodação simples para solteiro(a)</option>
                  <option value={NomeAcomadacao.CasalSimples}>Acomodação simples para casal</option>
                  <option value={NomeAcomadacao.FamilaSimples}>Acomodação para família com até duas crianças</option>
                  <option value={NomeAcomadacao.FamiliaMais}>Acomodação para família com até cinco crianças</option>
                  <option value={NomeAcomadacao.SolteiroMais}>Acomodação com garagem para solteiro(a)</option>
                  <option value={NomeAcomadacao.FamiliaSuper}>Acomodação para até duas famílias, casal e três crianças cada</option>
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
                    const clienteSelecionado = clientesDisponiveis.find(c => c.nome === e.target.value);
                    field.onChange(clienteSelecionado || null);
                  }}
                  value={field.value?.nome || ""}
                >
                  <option value="">Selecione um cliente</option>
                  {clientesDisponiveis.map((cliente) => (
                    <option key={cliente.nome} value={cliente.nome}>
                      {cliente.nome} - {cliente.nomeSocial}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Clientes Dependentes */}
        <div>
          <FormLabel>Clientes Dependentes</FormLabel>
          {form.watch("clientesDependentes").map((_, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <FormField
                control={form.control}
                name={`clientesDependentes.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <select 
                        className="w-full p-2 border rounded"
                        onChange={(e) => {
                          const clienteSelecionado = clientesDisponiveis.find(c => c.nome === e.target.value);
                          field.onChange(clienteSelecionado || null);
                        }}
                        value={field.value?.nome || ""}
                      >
                        <option value="">Selecione um dependente</option>
                        {clientesDisponiveis.map((cliente) => (
                          <option key={cliente.nome} value={cliente.nome}>
                            {cliente.nome} - {cliente.nomeSocial}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="button" 
                variant="destructive" 
                size="sm"
                onClick={() => removerDependente(index)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            onClick={adicionarDependente}
          >
            Adicionar Dependente
          </Button>
        </div>

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