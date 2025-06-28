import {
  GET_PROJECT,
  GET_PROJECT_FAIL,
  GET_PROJECT_SUCCESS,
} from "../actionTypes/project";
import { TProjectAction } from "../types/actions/project";
import { IProjectState } from "../types/states/project";

export const initState: IProjectState = {
  isLoading: null,
  project: null,
};

export const projectReducer = (
  state: IProjectState,
  action: TProjectAction
): IProjectState => {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        isLoading: true,
      };
    case GET_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: action.payload,
      };
    case GET_PROJECT_FAIL:
      return {
        ...state,
        isLoading: false,
        project: null,
      };
    default:
      return state;
  }
};
