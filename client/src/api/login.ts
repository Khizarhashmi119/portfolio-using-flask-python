import { BASE_URL } from "../constants";
import { TLoginResponse } from "../types/responses/login";

export const login = async (
  email: string,
  password: string
): Promise<TLoginResponse> => {
  const body = JSON.stringify({
    email,
    password,
  });

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: TLoginResponse = await res.json();
  return data;
};
