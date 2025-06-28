import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
} from "../../actionTypes/projects";
import { IProject } from "../entities/project";

export interface IGetProjects {
  type: typeof GET_PROJECTS;
}

export interface IGetProjectsSuccess {
  type: typeof GET_PROJECTS_SUCCESS;
  payload: IProject[];
}

export interface IGetProjectsFail {
  type: typeof GET_PROJECTS_FAIL;
}

export type TProjectsAction =
  | IGetProjects
  | IGetProjectsSuccess
  | IGetProjectsFail;
