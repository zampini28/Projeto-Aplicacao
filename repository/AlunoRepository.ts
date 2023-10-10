import { dataSource } from "../data-source";
import { Aluno } from "../entity/Aluno";

export const getAlunoRepository = () => {
  return dataSource.manager.getRepository(Aluno);
};

