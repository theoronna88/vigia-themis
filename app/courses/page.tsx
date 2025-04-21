import { db } from "../_lib/prisma";
import CourseAddButton from "./components/courses-add-button";
import CourseDataTable from "./components/courses-data-table";
import { columns } from "./components/courses-columns";

const CoursePage = async () => {
  const data = await db.courses.findMany({});

  const formattedData = data.map((course) => ({
    id: course.id,
    name: course.name,
    startDate: course.startDate.toISOString(),
    endDate: course.endDate.toISOString(),
    description: course.description,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-secondary">
        Página de Cursos
      </h1>

      <div className="flex items-center justify-end mt-8">
        <CourseAddButton />
      </div>
      <div className="mt-8">
        <span>tabela</span>
        <CourseDataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default CoursePage;
