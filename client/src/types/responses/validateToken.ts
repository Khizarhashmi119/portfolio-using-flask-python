import { DATA_KEY, STATUS_KEY, STATUS_SUCCESS } from "../../constants";
import { IAdmin } from "../entities/admin";
import { IFailureResponse } from "./failure";

export interface IValidateTokenSuccessResponse {
  [STATUS_KEY]: typeof STATUS_SUCCESS;
  [DATA_KEY]: {
    admin: IAdmin;
  };
}

export type TValidateTokenResponse =
  | IValidateTokenSuccessResponse
  | IFailureResponse;
