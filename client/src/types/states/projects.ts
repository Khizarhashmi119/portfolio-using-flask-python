import { IProject } from "../entities/project";

export interface IProjectsState {
  isLoading: boolean | null;
  projects: IProject[] | null;
}
