import {
  GET_SKILLS,
  GET_SKILLS_FAIL,
  GET_SKILLS_SUCCESS,
} from "../../actionTypes/skills";
import { ISkill } from "../entities/Skill";

export interface IGetSkills {
  type: typeof GET_SKILLS;
}

export interface IGetSkillsSuccess {
  type: typeof GET_SKILLS_SUCCESS;
  payload: ISkill[];
}

export interface IGetSkillsFail {
  type: typeof GET_SKILLS_FAIL;
}

export type TSkillsAction =
  | IGetSkills
  | IGetSkillsSuccess
  | IGetSkillsFail;
