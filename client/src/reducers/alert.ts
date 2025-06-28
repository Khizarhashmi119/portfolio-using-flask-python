import { v4 } from "uuid";

import { ADD_ALERT, REMOVE_ALERT } from "../actionTypes/alert";
import { TAlertAction } from "../types/actions/alert";
import { IAlert } from "../types/entities/alert";

export const initState: IAlert[] = [];

export const alertReducer = (
  state: IAlert[],
  action: TAlertAction
): IAlert[] => {
  switch (action.type) {
    case ADD_ALERT:
      const alert: IAlert = {
        id: v4(),
        type: action.payload.type,
        message: action.payload.message,
      };

      return [alert, ...state];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== action.payload);
    default:
      return state;
  }
};
