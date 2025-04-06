"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { upsertStudent } from "@/app/_actions/upsert-student";
import { useEffect } from "react";
import InputMask from "react-input-mask";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres",
  }),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: "CPF deve estar no formato XXX.XXX.XXX-XX",
  }),
  mother: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres",
  }),
  father: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres",
  }),
  birthday: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, {
      message: "A data deve estar no formato DD/MM/AAAA",
    })
    .refine(
      (date) => {
        const [day, month, year] = date.split("/").map(Number);
        const parsedDate = new Date(year, month - 1, day);
        const today = new Date();
        const eighteenYearsAgo = new Date(
          today.getFullYear() - 18,
          today.getMonth(),
          today.getDate()
        );
        return parsedDate <= eighteenYearsAgo;
      },
      {
        message: "A data de nascimento deve ser de pelo menos 18 anos atrás",
      }
    ),
  phone: z
    .string()
    .trim()
    .regex(/^\d{10,11}$/, {
      message: "O telefone deve conter 10 ou 11 dígitos. Ex: 11987654321",
    }),
  rg: z.string().min(3, {
    message: "O RG deve ter pelo menos 3 caracteres",
  }),
  tituloEleitoral: z.string().min(3, {
    message: "O Titulo Eleitoral deve ter pelo menos 3 caracteres",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface StudentFormProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  studentId?: string;
  setIsOpen: (isOpen: boolean) => void;
}

function normalizeDefaultValues(values: Partial<FormSchema>): FormSchema {
  return {
    ...values,
    birthday: values.birthday
      ? typeof values.birthday === "string"
        ? values.birthday
        : new Date(values.birthday).toLocaleDateString("pt-BR")
      : "",
  } as FormSchema;
}

const StudentFormDialog = ({
  isOpen,
  defaultValues,
  studentId,
  setIsOpen,
}: StudentFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? normalizeDefaultValues(defaultValues)
      : {
          name: "",
          cpf: "",
          mother: "",
          father: "",
          birthday: "",
          phone: "",
          rg: "",
          tituloEleitoral: "",
          email: "",
        },
  });

  useEffect(() => {
    if (isOpen && defaultValues) {
      form.reset(normalizeDefaultValues(defaultValues));
    }
  }, [isOpen, defaultValues, form]);

  const onSubmit = async (values: FormSchema) => {
    console.log("Valores do formulário:", values);

    const formattedValues = {
      ...values,
      birthday: new Date(values.birthday.split("/").reverse().join("-")),
    };

    await upsertStudent({
      ...formattedValues,
      id: studentId,
    })
      .then(() => {
        setIsOpen(false);
        form.reset();
        console.log("Aluno criado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao criar aluno:", error);
      });
  };

  const isUpdate = Boolean(studentId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="flex flex-col gap-1 max-h-screen overflow-y-scroll">
        <DialogHeader className="font-extrabold text-2xl">
          {isUpdate ? "Atualizar " : "Criação de novo "}aluno
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormDescription>Preencha o nome do aluno.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mother"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Mãe</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da mãe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Preencha o nome da mãe completo do aluno.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="father"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Pai</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do pai" {...field} />
                  </FormControl>
                  <FormDescription>
                    Preencha o nome do pai completo do aluno.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input placeholder="CPF" {...field} />
                  </FormControl>
                  <FormDescription>Preencha o CPF do aluno.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rg"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RG</FormLabel>
                  <FormControl>
                    <Input placeholder="RG" {...field} />
                  </FormControl>
                  <FormDescription>Preencha o RG do aluno.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tituloEleitoral"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo Eleitoral</FormLabel>
                  <FormControl>
                    <Input placeholder="Titulo Eleitoral" {...field} />
                  </FormControl>
                  <FormDescription>
                    Preencha o Titulo Eleitoral do aluno.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormDescription>Preencha o email do aluno.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="Telefone" {...field} />
                  </FormControl>
                  <FormDescription>
                    Preencha o telefone do aluno.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Nascimento</FormLabel>
                  <FormControl>
                    <InputMask
                      mask="99/99/9999"
                      placeholder="DD/MM/AAAA"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      {(
                        inputProps: React.InputHTMLAttributes<HTMLInputElement>
                      ) => <Input {...inputProps} />}
                    </InputMask>
                  </FormControl>
                  <FormDescription>
                    Preencha a data de nascimento no formato DD/MM/AAAA.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end space-x-2 py-2">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default StudentFormDialog;
