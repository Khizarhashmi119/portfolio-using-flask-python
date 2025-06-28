import { IAdmin } from "../entities/admin";

export interface IAuthState {
  isLoading: boolean | null;
  isAuthenticated: boolean | null;
  admin: IAdmin | null;
  token: string | null;
}
