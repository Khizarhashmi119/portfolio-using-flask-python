import { DATA_KEY, STATUS_KEY, STATUS_SUCCESS } from "../../constants";
import { ISkill } from "../entities/Skill";
import { IFailureResponse } from "./failure";

export interface IGetSkillsSuccessResponse {
  [STATUS_KEY]: typeof STATUS_SUCCESS;
  [DATA_KEY]: {
    skills: ISkill[];
  };
}

export type TGetSkillsResponse =
  | IGetSkillsSuccessResponse
  | IFailureResponse;
