"use client";

import { Button } from "@/app/_components/ui/button";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
import CourseFormDialog from "./courses-dialog-form";

interface CourseEditButtonProps {
  course: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
  };
}

const CourseEditButton = ({ course }: CourseEditButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)} variant="ghost">
        <PencilIcon />
      </Button>
      <CourseFormDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{ ...course }}
        courseId={course.id}
      />
    </>
  );
};

export default CourseEditButton;
