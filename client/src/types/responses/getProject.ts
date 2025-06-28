import { DATA_KEY, STATUS_KEY, STATUS_SUCCESS } from "../../constants";
import { IProject } from "../entities/project";
import { IFailureResponse } from "./failure";

export interface IGetProjectSuccessResponse {
  [STATUS_KEY]: typeof STATUS_SUCCESS;
  [DATA_KEY]: {
    project: IProject;
  };
}

export type TValidateTokenResponse =
  | IGetProjectSuccessResponse
  | IFailureResponse;
