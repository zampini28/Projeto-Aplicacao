import { dataSource } from "../app";
import { Administrador } from "../entity/Administrador";

export const getAdminRepository = () => {
  return dataSource.manager.getRepository(Administrador);
};

