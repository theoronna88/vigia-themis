import { z } from "zod";

export const upsertStudentSchema = z.object({
  name: z.string().nonempty("O nome deve ser preenchido"),
  father: z.string().nonempty("O nome do pai deve ser preenchido"),
  mother: z.string().nonempty("O nome da mãe deve ser preenchido"),
  birthday: z.date().refine(
    (date) => {
      const today = new Date();
      const eighteenYearsAgo = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
      );
      return date <= eighteenYearsAgo;
    },
    {
      message: "A data de nascimento deve ser de pelo menos 18 anos atrás",
    }
  ),
  rg: z.string().nonempty("O RG deve ser preenchido"),
  cpf: z.string().nonempty("O CPF deve ser preenchido"),
  phone: z.string().nonempty("O telefone deve ser preenchido"),
  tituloEleitoral: z
    .string()
    .nonempty("O título eleitoral deve ser preenchido"),
  email: z.string().email("Email inválido"),
});
