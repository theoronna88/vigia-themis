export const studentsMock = Array.from({ length: 100 }, (_, index) => ({
  id: `student-${index + 1}`,
  name: `Aluno ${index + 1}`,
  father: `Pai ${index + 1}`,
  mother: `Mãe ${index + 1}`,
  birthday: new Date(
    2000,
    Math.floor(Math.random() * 12),
    Math.floor(Math.random() * 28) + 1
  ), // ❌ Deve ser uma string no formato DD/MM/AAAA
  rg: `${Math.floor(1000000 + Math.random() * 9000000)}`,
  cpf: `${Math.floor(100 + Math.random() * 900)}.${Math.floor(
    100 + Math.random() * 900
  )}.${Math.floor(100 + Math.random() * 900)}-${Math.floor(
    10 + Math.random() * 90
  )}`,
  phone: `6199${Math.floor(1000000 + Math.random() * 9000000)}`,
  tituloEleitoral: `${Math.floor(10000000000 + Math.random() * 90000000000)}`,
  email: `aluno${index + 1}@exemplo.com`,
  createdAt: new Date(),
  updatedAt: new Date(),
}));
