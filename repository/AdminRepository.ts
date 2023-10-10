import { dataSource } from "../data-source";
import { Administrador } from "../entity/Administrador";

export const getAdminRepository = () => {
  return dataSource.manager.getRepository(Administrador);
};

