import {
  GET_PROJECT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
} from "../../actionTypes/project";
import { IProject } from "../entities/project";

export interface IGetProject {
  type: typeof GET_PROJECT;
}

export interface IGetProjectSuccess {
  type: typeof GET_PROJECT_SUCCESS;
  payload: IProject;
}

export interface IGetProjectFail {
  type: typeof GET_PROJECT_FAIL;
}

export type TProjectAction = IGetProject | IGetProjectSuccess | IGetProjectFail;
