export type TAlertType = "error" | "success";

export interface IAlert {
  id: string;
  type: TAlertType;
  message: string;
}
