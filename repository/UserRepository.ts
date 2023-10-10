import { dataSource } from "../app";
import { Usuario } from "../entity/Usuario";

export const getUserRepository = () => {
  return dataSource.manager.getRepository(Usuario);
};
