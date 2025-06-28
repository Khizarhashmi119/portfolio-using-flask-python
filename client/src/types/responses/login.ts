import { DATA_KEY, STATUS_KEY, STATUS_SUCCESS } from "../../constants";
import { IAdmin } from "../entities/admin";
import { IFailureResponse } from "./failure";

export interface ILoginSuccessResponse {
  [STATUS_KEY]: typeof STATUS_SUCCESS;
  [DATA_KEY]: {
    admin: IAdmin;
    access_token: string;
  };
}

export type TLoginResponse = ILoginSuccessResponse | IFailureResponse;
