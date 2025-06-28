import { IProject } from "../entities/project";

export interface IProjectState {
  isLoading: boolean | null;
  project: IProject | null;
}
