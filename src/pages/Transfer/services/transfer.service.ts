import axios from "axios";
import { WithdrawalRequest } from "../models/transfer.model";

export const getAllTransferByUserService = async (
  idUser: number
): Promise<WithdrawalRequest[]> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    `withdrawal-request/all-withdrawal-request-by-id-user/${idUser}`;
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data.data;
};
