import { dataSource } from "../data-source";
import { Disciplina } from "../entity/Disciplina";

export const getDisciplinaRepository = () => {
  return dataSource.manager.getRepository(Disciplina);
};
