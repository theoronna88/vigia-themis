"use server";

import { db } from "@/app/_lib/prisma";
import { upsertStudentSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertStudentParams {
  id?: string;
  name: string;
  father: string;
  mother: string;
  birthday: Date;
  rg: string;
  cpf: string;
  phone: string;
  tituloEleitoral: string;
  email: string;
}

export const upsertStudent = async (params: UpsertStudentParams) => {
  upsertStudentSchema.parse(params);

  await db.student.upsert({
    update: {
      ...params,
    },
    create: {
      ...params,
    },
    where: {
      id: params?.id ?? "",
    },
  });
  revalidatePath("/students");
};
