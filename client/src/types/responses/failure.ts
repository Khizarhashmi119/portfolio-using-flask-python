import { STATUS_KEY, STATUS_FAILURE, DATA_KEY, MESSAGES_KEY } from "../../constants";

export interface IFailureResponse {
  [STATUS_KEY]: typeof STATUS_FAILURE;
  [DATA_KEY]: {
    [MESSAGES_KEY]: string[];
  };
}