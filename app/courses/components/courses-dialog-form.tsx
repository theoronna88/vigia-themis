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
import { upsertCourse } from "@/app/_actions/upsert-course";
import { useEffect } from "react";
import InputMask from "react-input-mask";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "O nome deve ter pelo menos 3 caracteres",
  }),
  description: z.string().min(3, {
    message: "A descrição deve ter pelo menos 3 caracteres",
  }),
  startDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: "A data deve estar no formato DD/MM/AAAA",
  }),
  endDate: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: "A data deve estar no formato DD/MM/AAAA",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

interface CourseFormProps {
  isOpen: boolean;
  defaultValues?: FormSchema;
  courseId?: string;
  setIsOpen: (isOpen: boolean) => void;
}
/*
function normalizeDefaultValues(values: Partial<FormSchema>): FormSchema {
  console.log("Valores normalizados:", values);
  return {
    ...values,
    startDate: values.startDate
      ? typeof values.startDate === "string"
        ? values.startDate
        : new Date(values.startDate).toLocaleDateString("pt-BR")
      : "",
    endDate: values.endDate
      ? typeof values.endDate === "string"
        ? values.endDate
        : new Date(values.endDate).toLocaleDateString("pt-BR")
      : "",
  } as FormSchema;
}
*/
function normalizeDefaultValues(values: Partial<FormSchema>): FormSchema {
  return {
    name: values.name ?? "",
    description: values.description ?? "",
    startDate: formatIsoToBr(values.startDate),
    endDate: formatIsoToBr(values.endDate),
  };
}
function formatIsoToBr(isoDate?: string): string {
  if (!isoDate) return "";

  const [yyyy, mm, dd] = isoDate.split("T")[0].split("-");
  return `${dd}/${mm}/${yyyy}`;
}

const CourseFormDialog = ({
  isOpen,
  defaultValues,
  courseId,
  setIsOpen,
}: CourseFormProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
      ? normalizeDefaultValues(defaultValues)
      : {
          name: "",
          description: "",
          startDate: "",
          endDate: "",
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
      startDate: new Date(values.startDate.split("/").reverse().join("-")),
      endDate: new Date(values.endDate.split("/").reverse().join("-")),
    };

    await upsertCourse({
      ...formattedValues,
      id: courseId,
    })
      .then(() => {
        setIsOpen(false);
        form.reset();
        console.log("Curso criado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao criar curso:", error);
      });
  };

  const isUpdate = Boolean(courseId);

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
          {isUpdate ? "Atualizar " : "Criação de novo "}curso
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
                  <FormDescription>Preencha o nome do curso.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormDescription>Preencha do curso.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Início</FormLabel>
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
                    Preencha a data de início no formato DD/MM/AAAA.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Término</FormLabel>
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
                    Preencha a data de término no formato DD/MM/AAAA.
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

export default CourseFormDialog;
