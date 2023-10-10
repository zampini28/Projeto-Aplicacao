import { dataSource } from "../data-source";
import { Responsavel } from "../entity/Responsavel";

export const getResponsavelRepository = () => {
  return dataSource.manager.getRepository(Responsavel);
};
