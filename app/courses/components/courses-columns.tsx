"use client";

import { ColumnDef } from "@tanstack/react-table";
import CourseEditButton from "./courses-edit-button";

function formatIsoToBr(isoDate: string): string {
  const [yyyy, mm, dd] = isoDate.split("T")[0].split("-");
  return `${dd}/${mm}/${yyyy}`;
}

export const columns: ColumnDef<{
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
  },
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
  },
  {
    accessorKey: "description",
    header: "Descrição",
    cell: ({ row }) => <div>{row.getValue("description")}</div>,
  },
  {
    accessorKey: "startDate",
    header: "Data de Início",
    cell: ({ row }) => {
      const raw = row.getValue("startDate") as string;
      return <div>{formatIsoToBr(raw)}</div>;
    },
  },
  {
    accessorKey: "endDate",
    header: "Data de Término",
    cell: ({ row }) => {
      const raw = row.getValue("endDate") as string;
      return <div>{formatIsoToBr(raw)}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: course } }) => (
      <CourseEditButton course={course} />
    ),
  },
];
