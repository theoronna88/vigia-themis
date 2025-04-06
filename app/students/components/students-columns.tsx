"use client";

import { ColumnDef } from "@tanstack/react-table";
import StudentEditButton from "./students-edit-button";

export const columns: ColumnDef<{
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  father: string;
  mother: string;
  birthday: string;
  rg: string;
  cpf: string;
  tituloEleitoral: string;
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
    accessorKey: "phone",
    header: "Telefone",
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: student } }) => (
      <StudentEditButton student={student} />
    ),
  },
];
