import axios from "axios";
import {
  RegisterWithdrawalRequest,
  WithdrawalRequest,
} from "../../Transfer/models/transfer.model";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";

export const validateActiveRequestService = async (
  idUser: number
): Promise<WithdrawalRequest[]> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    `withdrawal-request/all-withdrawal-request-by-id-user/${idUser}`;
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data.data;
};

export const withdrawalRegisterRequestService = async (
  data: RegisterWithdrawalRequest
): Promise<ApiBasicResponse> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    `withdrawal-request/create-withdrawal-request`;
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
