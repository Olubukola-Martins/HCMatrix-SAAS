import { ICurrentCompany } from "../../AppTypes/DataEntitities";

export interface ICreateEmpProps extends ICurrentCompany {
  password: string;
  confirmPassword: string;
}
