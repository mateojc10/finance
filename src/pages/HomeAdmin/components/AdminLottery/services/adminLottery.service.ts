import axios from "axios";
import { ApiBasicResponse } from "../../../../../models/apiBasicResponse.model";
import {
  ApiLotteryData,
  CreateLotteryForm,
  UpdateLotteryForm,
} from "../model/adminLottery.model";

export const getAllLotteryService = async (): Promise<ApiLotteryData[]> => {
  const urlLogin = process.env.REACT_APP_API_HOST + "lottery/get-all-lottery/";
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data.data;
};
export const createLotteryService = async (
  data: CreateLotteryForm
): Promise<ApiBasicResponse> => {
  const urlLogin = process.env.REACT_APP_API_HOST + "lottery/create-lottery";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};

export const updateLotteryService = async (
  data: UpdateLotteryForm
): Promise<ApiBasicResponse> => {
  const urlLogin = process.env.REACT_APP_API_HOST + "lottery/update-lottery";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
