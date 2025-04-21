import { z } from "zod";

export const upsertCourseSchema = z
  .object({
    name: z.string().nonempty("O nome deve ser preenchido"),
    description: z.string().nonempty("A descrição deve ser preenchida"),
    startDate: z.date().refine(
      (date) => {
        const today = new Date();
        const oneWeekAgo = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - 7
        );
        return date >= oneWeekAgo;
      },
      {
        message: "A data de início não pode ser mais de uma semana atrás",
      }
    ),
    endDate: z.date(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "A data de término deve ser maior ou igual à data de início",
  });
