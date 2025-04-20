import { db } from "../_lib/prisma";
import StudentAddButton from "./components/students-add-button";
import { columns } from "./components/students-columns";
import StudentDataTable from "./components/students-data-table";

const StudentPage = async () => {
  const data = await db.student.findMany({});

  const formattedData = data.map((student) => ({
    id: student.id,
    name: student.name,
    father: student.father,
    mother: student.mother,
    birthday: student.birthday.toISOString(),
    rg: student.rg,
    cpf: student.cpf,
    phone: student.phone,
    tituloEleitoral: student.tituloEleitoral,
    email: student.email,
  }));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-semibold text-secondary">
        Página de Alunos
      </h1>

      <div className="flex items-center justify-end mt-8">
        <StudentAddButton />
      </div>
      <div className="mt-8">
        <StudentDataTable columns={columns} data={formattedData} />
      </div>
    </div>
  );
};

export default StudentPage;
