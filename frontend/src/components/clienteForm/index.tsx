"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Resolver } from "react-hook-form"
import { z } from "zod"

// interfaces
import { TipoDocumento } from "@/enums/tipoDocumento";
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
import { Checkbox } from "@/components/ui/checkbox"

// icons
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const formSchema = z.object({
  nome: z.string().min(2, {
    message: "Nome deve ter pelo menos 2 caracteres.",
  }),
  nomeSocial: z.string().min(2, {
    message: "Nome social deve ter pelo menos 2 caracteres.",
  }),
  dataNascimento: z.string().min(1, {
    message: "Data de nascimento é obrigatória.",
  }),
  isDependente: z.boolean().optional().default(false),
  titularId: z.number().optional(),
  telefones: z.array(z.object({
    ddd: z.string().min(2, { message: "DDD deve ter 2 dígitos." }),
    numero: z.string().min(8, { message: "Número deve ter pelo menos 8 dígitos." })
  })).min(1, { message: "Pelo menos um telefone é obrigatório." }),
  endereco: z.object({
    rua: z.string().min(1, { message: "Rua é obrigatória." }),
    bairro: z.string().min(1, { message: "Bairro é obrigatório." }),
    cidade: z.string().min(1, { message: "Cidade é obrigatória." }),
    estado: z.string().min(2, { message: "Estado é obrigatório." }),
    pais: z.string().min(1, { message: "País é obrigatório." }),
    codigoPostal: z.string().min(1, { message: "CEP é obrigatório." })
  }),
  documentos: z.array(z.object({
    numero: z.string().min(1, { message: "Número do documento é obrigatório." }),
    tipo: z.union([z.string(), z.number()]).transform((val) => {
      const num = typeof val === 'string' ? parseInt(val) : val;
      if ([0, 1, 2].includes(num)) return num;
      throw new Error("Tipo de documento deve ser CPF (0), RG (1) ou Passaporte (2)");
    }),
    dataExpedicao: z.string().min(1, { message: "Data de expedição é obrigatória." })
  })).min(1, { message: "Pelo menos um documento é obrigatório." })
})

type FormData = z.infer<typeof formSchema>

interface ClienteFormProps {
  initialData?: Cliente;
  onSubmit: (data: FormData) => void;
  isEditMode?: boolean;
  clientesTitulares?: Cliente[]; // Lista de clientes que não são dependentes
}

export function ClienteForm({ initialData, onSubmit, isEditMode = false, clientesTitulares = [] }: ClienteFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema) as Resolver<FormData>,
    defaultValues: initialData ? {
      nome: initialData.nome,
      nomeSocial: initialData.nomeSocial,
      dataNascimento: initialData.dataNascimento 
        ? new Date(initialData.dataNascimento).toISOString().split('T')[0]
        : '',
      isDependente: !!initialData.titularId,
      titularId: initialData.titularId || undefined,
      telefones: initialData.telefones,
      endereco: initialData.endereco,
      documentos: initialData.documentos.map(doc => ({
        ...doc,
        tipo: typeof doc.tipo === 'string' ? parseInt(doc.tipo) : doc.tipo,
        dataExpedicao: doc.dataExpedicao 
          ? new Date(doc.dataExpedicao).toISOString().split('T')[0]
          : ''
      }))
    } : {
      nome: "",
      nomeSocial: "",
      dataNascimento: "",
      isDependente: false,
      titularId: undefined,
      telefones: [{ ddd: "", numero: "" }],
      endereco: {
        rua: "",
        bairro: "",
        cidade: "",
        estado: "",
        pais: "Brasil",
        codigoPostal: ""
      },
      documentos: [{ numero: "", tipo: TipoDocumento.CPF, dataExpedicao: "" }]
    }
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };

  const isDependente = form.watch("isDependente");

  return (
    <Form {...form}>
      <form id="cliente-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 px-3 overflow-y-auto">
        {/* Dados Básicos */}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nomeSocial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Social</FormLabel>
                <FormControl>
                  <Input placeholder="Nome social" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dataNascimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Nascimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Checkbox IsDependente */}
        <FormField
          control={form.control}
          name="isDependente"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  É dependente de outro cliente?
                </FormLabel>
                <FormDescription>
                  Marque se este cliente é dependente de um cliente titular
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Select Cliente Titular */}
        {isDependente && (
          <FormField
            control={form.control}
            name="titularId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cliente Titular</FormLabel>
                <FormControl>
                  <select 
                    className="w-full p-2 border rounded"
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                    value={field.value || ""}
                  >
                    <option value="">Selecione um cliente titular</option>
                    {clientesTitulares.map((cliente) => (
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
        )}

        {/* Telefones */}
        <div>
          <FormLabel>Telefones</FormLabel>
          {form.watch("telefones").map((_, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <FormField
                control={form.control}
                name={`telefones.${index}.ddd`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="DDD" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`telefones.${index}.numero`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Número" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("telefones").length > 1 && (
                <Button 
                  type="button" 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    const currentTelefones = form.getValues("telefones");
                    const newTelefones = currentTelefones.filter((_, i) => i !== index);
                    form.setValue("telefones", newTelefones);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              )}
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              const currentTelefones = form.getValues("telefones");
              form.setValue("telefones", [...currentTelefones, { ddd: "", numero: "" }]);
            }}
          >
            Adicionar Telefone
          </Button>
        </div>

        {/* Endereço */}
        <div>
          <FormLabel>Endereço</FormLabel>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="endereco.rua"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Rua" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endereco.bairro"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endereco.cidade"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endereco.estado"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Estado" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endereco.pais"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="País" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="endereco.codigoPostal"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="CEP" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Documentos */}
        <div>
          <FormLabel>Documentos</FormLabel>
          {form.watch("documentos").map((_, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <FormField
                control={form.control}
                name={`documentos.${index}.numero`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Número do documento" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`documentos.${index}.tipo`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <select 
                        className="w-full p-2 border rounded"
                        onChange={(e) => field.onChange(parseInt(e.target.value))}
                        value={field.value}
                      >
                        <option value={TipoDocumento.CPF}>CPF</option>
                        <option value={TipoDocumento.RG}>RG</option>
                        <option value={TipoDocumento.Passaporte}>Passaporte</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name={`documentos.${index}.dataExpedicao`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("documentos").length > 1 && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      const currentDocumentos = form.getValues("documentos");
                      const newDocumentos = currentDocumentos.filter((_, i) => i !== index);
                      form.setValue("documentos", newDocumentos);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => {
              const currentDocumentos = form.getValues("documentos");
              form.setValue("documentos", [...currentDocumentos, { 
                numero: "", 
                tipo: TipoDocumento.CPF as number, 
                dataExpedicao: "" 
              }]);
            }}
          >
            Adicionar Documento
          </Button>
        </div>
      </form>
    </Form>
  );
} 