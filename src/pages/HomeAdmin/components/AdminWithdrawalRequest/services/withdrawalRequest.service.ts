import axios from "axios";
import {
  ActuallyResponseIdLotteryIdUserRequest,
  UpdateFormWithdrawalRequest,
  WithdrawalRequest,
} from "../../../../Transfer/models/transfer.model";
import { withdrawalRequestTableWithoutResponseDataAdapter } from "../adapters/withdrawalRequest.adapter";
import { ApiBasicResponse } from "../../../../../models/apiBasicResponse.model";
import { AddNewWithdrawalRequest } from "../models/withdrawalRequest.model";

export const getAllWithdrawalRequestWithOutResponseService = async (): Promise<
  WithdrawalRequest[]
> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    "withdrawal-request/all-withdrawal-request";
  const responseWithAxios = await axios.get(urlLogin);
  return withdrawalRequestTableWithoutResponseDataAdapter(
    responseWithAxios.data.data
  );
};

export const getAllWithdrawalRequestService = async (): Promise<
  WithdrawalRequest[]
> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    "withdrawal-request/all-withdrawal-request";
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data.data;
};
export const updateWithdrawalRequestService = async (
  data: UpdateFormWithdrawalRequest
): Promise<ApiBasicResponse> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    "withdrawal-request/update-withdrawal-request";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data.data;
};

export const actuallyResponseWithdrawalIdLotteryIdUserRequestService = async (
  data: ActuallyResponseIdLotteryIdUserRequest
): Promise<WithdrawalRequest[]> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    "withdrawal-request/all-withdrawal-request-by-id-lottery";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data.data;
};

export const addNewResponseWithdrawalRequestService = async (
  data: AddNewWithdrawalRequest
): Promise<ApiBasicResponse> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    "withdrawal-request/create-new-withdrawal-request";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
