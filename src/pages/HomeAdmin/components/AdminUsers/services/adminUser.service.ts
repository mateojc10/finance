import axios from "axios";
import {
  AssociateLotteryToUser,
  ChangePasswordUser,
  CreateUserForm,
  EditUserAdminForm,
  ProfileUserData,
} from "../models/adminUsers.model";
import { ApiBasicResponse } from "../../../../../models/apiBasicResponse.model";

export const getAllUsersService = async (): Promise<ProfileUserData[]> => {
  const urlLogin = process.env.REACT_APP_API_HOST + "user/get-all-user";
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data.data;
};
export const createUserService = async (
  data: CreateUserForm
): Promise<ApiBasicResponse> => {
  const urlLogin = process.env.REACT_APP_API_HOST + "user/create-user";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
export const editUserAdminService = async (
  data: EditUserAdminForm
): Promise<ApiBasicResponse> => {
  const urlLogin = process.env.REACT_APP_API_HOST + "user/update-user-admin";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
export const changePasswordService = async (data: ChangePasswordUser) => {
  const urlLogin = process.env.REACT_APP_API_HOST + "user/change-password";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
export const associateLotteryService = async (data: AssociateLotteryToUser) => {
  const urlLogin = process.env.REACT_APP_API_HOST + "user/add-lottery-to-user";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
