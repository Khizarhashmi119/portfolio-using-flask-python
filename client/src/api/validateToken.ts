import { BASE_URL } from "../constants";
import { TValidateTokenResponse } from "../types/responses/validateToken";

export const validateToken = async (
  token: string
): Promise<TValidateTokenResponse> => {
  const res = await fetch(`${BASE_URL}/auth/validate`, {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  });

  const data: TValidateTokenResponse = await res.json();
  return data;
};
