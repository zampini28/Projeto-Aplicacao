import { dataSource } from "../data-source";
import { Professor } from "../entity/Professor";

export const getProfessorRepository = () => {
  return dataSource.manager.getRepository(Professor);
};
