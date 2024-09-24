import axios from "axios";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";
import { EditProfile } from "../models/Profile.model";

export const getDataUserByIdservice = async (
  idUser: number
): Promise<ApiBasicResponse> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST + `user/get-user-data-by-id/${idUser}`;
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data;
};

export const saveDataUserService = async (
  data: EditProfile
): Promise<ApiBasicResponse> => {
  const urlLogin = process.env.REACT_APP_API_HOST + `user/update-user`;
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
