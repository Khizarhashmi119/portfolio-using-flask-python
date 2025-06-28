import { BASE_URL } from "../constants";
import { TGetSkillsResponse } from "../types/responses/getSkills";

export const getSkills = async (
  limit?: number,
  offset?: number
): Promise<TGetSkillsResponse> => {
  let url = `${BASE_URL}/skills`;
  if (limit) url += `?limit=${limit}`;
  if (offset) url += `&offset=${offset}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: TGetSkillsResponse = await res.json();
  return data;
};
