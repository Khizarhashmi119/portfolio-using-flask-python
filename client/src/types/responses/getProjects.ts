import { DATA_KEY, STATUS_KEY, STATUS_SUCCESS } from "../../constants";
import { IProject } from "../entities/project";
import { IFailureResponse } from "./failure";

export interface IGetProjectsSuccessResponse {
  [STATUS_KEY]: typeof STATUS_SUCCESS;
  [DATA_KEY]: {
    projects: IProject[];
  };
}

export type TGetProjectsResponse =
  | IGetProjectsSuccessResponse
  | IFailureResponse;
