"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
  dataCadastro: z.string().min(1, {
    message: "Data de cadastro é obrigatória.",
  }),
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
    tipo: z.nativeEnum(TipoDocumento),
    dataExpedicao: z.string().min(1, { message: "Data de expedição é obrigatória." })
  })).min(1, { message: "Pelo menos um documento é obrigatório." })
})

type FormData = z.infer<typeof formSchema>

interface ClienteFormProps {
  initialData?: Cliente;
  onSubmit: (data: FormData) => void;
  isEditMode?: boolean;
}

export function ClienteForm({ initialData, onSubmit, isEditMode = false }: ClienteFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      nome: initialData.nome,
      nomeSocial: initialData.nomeSocial,
      dataNascimento: initialData.dataNascimento instanceof Date 
        ? initialData.dataNascimento.toISOString().split('T')[0]
        : '',
      dataCadastro: initialData.dataCadastro instanceof Date 
        ? initialData.dataCadastro.toISOString().split('T')[0]
        : '',
      telefones: initialData.telefones,
      endereco: initialData.endereco,
      documentos: initialData.documentos.map(doc => ({
        ...doc,
        dataExpedicao: doc.dataExpedicao instanceof Date 
          ? doc.dataExpedicao.toISOString().split('T')[0]
          : ''
      }))
    } : {
      nome: "",
      nomeSocial: "",
      dataNascimento: "",
      dataCadastro: new Date().toISOString().split('T')[0],
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
          {!isEditMode && (
            <FormField
              control={form.control}
              name="dataCadastro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Cadastro</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

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
                      <select {...field} className="w-full p-2 border rounded">
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
              form.setValue("documentos", [...currentDocumentos, { numero: "", tipo: TipoDocumento.CPF, dataExpedicao: "" }]);
            }}
          >
            Adicionar Documento
          </Button>
        </div>
      </form>
    </Form>
  );
} 