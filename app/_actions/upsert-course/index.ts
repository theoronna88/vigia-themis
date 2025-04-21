"use server";

import { db } from "@/app/_lib/prisma";
import { upsertCourseSchema } from "./schema";
import { revalidatePath } from "next/cache";

interface UpsertCourseParams {
  id?: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export const upsertCourse = async (params: UpsertCourseParams) => {
  upsertCourseSchema.parse(params);

  await db.courses.upsert({
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
  revalidatePath("/courses");
};
