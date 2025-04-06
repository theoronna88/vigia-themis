"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import StudentFormDialog from "./students-dialog-form";
import { useState } from "react";

const StudentAddButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const userCanAddTransaction = true;
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogIsOpen(true)}
            >
              Adicionar Aluno
            </Button>
          </TooltipTrigger>
          <TooltipContent>{!userCanAddTransaction && "."}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <StudentFormDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default StudentAddButton;
