import { ADD_ALERT, REMOVE_ALERT } from "../../actionTypes/alert";
import { TAlertType } from "../../types/entities/alert";

export interface IAddAlertAction {
  type: typeof ADD_ALERT;
  payload: {
    type: TAlertType;
    message: string;
  };
}

export interface IRemoveAlertAction {
  type: typeof REMOVE_ALERT;
  payload: string;
}

export type TAlertAction = IAddAlertAction | IRemoveAlertAction;
