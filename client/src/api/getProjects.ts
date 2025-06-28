import { BASE_URL } from "../constants";
import { TGetProjectsResponse } from "../types/responses/getProjects";

export const getProjects = async (
  limit?: number,
  offset?: number
): Promise<TGetProjectsResponse> => {
  let url = `${BASE_URL}/projects`;
  if (limit) url += `?limit=${limit}`;
  if (offset) url += `&offset=${offset}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: TGetProjectsResponse = await res.json();
  return data;
};
