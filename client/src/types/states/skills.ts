import { ISkill } from "../entities/Skill";

export interface ISkillsState {
  isLoading: boolean | null;
  skills: ISkill[] | null;
}
