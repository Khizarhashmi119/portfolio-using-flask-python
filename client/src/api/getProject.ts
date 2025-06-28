import { BASE_URL } from "../constants";
import { IGetProjectSuccessResponse } from "../types/responses/getProject";

export const getProject = async (
  projectId: string
): Promise<IGetProjectSuccessResponse> => {
  const res = await fetch(`${BASE_URL}/projects/${projectId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: IGetProjectSuccessResponse = await res.json();
  return data;
};
