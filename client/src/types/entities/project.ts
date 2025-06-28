import { ISkill } from "./Skill";

export interface IProject {
  uid: string;
  title: string;
  description: string;
  repo_url: string;
  url: string;
  cover_image_url: string;
  admin_uid: string;
  skills: ISkill[];
  created_at: string;
  updated_at: string;
}
