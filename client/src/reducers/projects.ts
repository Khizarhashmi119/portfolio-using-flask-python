import {
  GET_PROJECTS,
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
} from "../actionTypes/projects";
import { TProjectsAction } from "../types/actions/projects";
import { IProjectsState } from "../types/states/projects";

export const initState: IProjectsState = {
  isLoading: null,
  projects: null,
};

export const projectsReducer = (
  state: IProjectsState,
  action: TProjectsAction
): IProjectsState => {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };
    case GET_PROJECTS_FAIL:
      return {
        ...state,
        isLoading: false,
        projects: null,
      };
    default:
      return state;
  }
};
