import axios from "axios";
import { AuthAccessLogin } from "../models/login.model";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";

export const authValidateService = async (
  data: AuthAccessLogin
): Promise<ApiBasicResponse> => {
  const urlLogin = process.env.REACT_APP_API_HOST + "login/auth";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
