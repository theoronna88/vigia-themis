"use client";
import { Button } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import CourseFormDialog from "./courses-dialog-form";
import { useState } from "react";

const CourseAddButton = () => {
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
              Adicionar Curso
            </Button>
          </TooltipTrigger>
          <TooltipContent>{!userCanAddTransaction && "."}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <CourseFormDialog isOpen={dialogIsOpen} setIsOpen={setDialogIsOpen} />
    </>
  );
};

export default CourseAddButton;
