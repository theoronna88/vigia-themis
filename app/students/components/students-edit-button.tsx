"use client";

import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import StudentFormDialog from "./students-dialog-form";

interface StudentEditButtonProps {
  student: {
    id: string;
    email: string;
    name: string;
    phone: string;
    father: string;
    mother: string;
    birthday: string;
    rg: string;
    cpf: string;
    tituloEleitoral: string;
  };
}

const StudentEditButton = ({ student }: StudentEditButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)} variant="ghost">
        <PencilIcon />
      </Button>
      <StudentFormDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{ ...student }}
        studentId={student.id}
      />
    </>
  );
};

export default StudentEditButton;
