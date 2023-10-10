import { dataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";

export const getUserRepository = () => {
  return dataSource.manager.getRepository(Usuario);
};
