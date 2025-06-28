import {
  GET_SKILLS,
  GET_SKILLS_FAIL,
  GET_SKILLS_SUCCESS,
} from "../actionTypes/skills";
import { TSkillsAction } from "../types/actions/skills";
import { ISkillsState } from "../types/states/skills";

export const initState: ISkillsState = {
  isLoading: null,
  skills: null,
};

export const skillsReducer = (
  state: ISkillsState,
  action: TSkillsAction
): ISkillsState => {
  switch (action.type) {
    case GET_SKILLS:
      return {
        ...state,
        isLoading: true,
      };
    case GET_SKILLS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        skills: action.payload,
      };
    case GET_SKILLS_FAIL:
      return {
        ...state,
        isLoading: false,
        skills: null,
      };
    default:
      return state;
  }
};
