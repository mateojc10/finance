import axios from "axios";
import {
  ApiTechnicalSupportData,
  EditTechnicalSupportData,
} from "../models/technicalSupport.model";
import { ApiBasicResponse } from "../../../../../models/apiBasicResponse.model";

export const getAllTechnicalSupportService = async (): Promise<
  ApiTechnicalSupportData[]
> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST + "technical-support/get-all-reports";
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data.data;
};
export const updateTechnicalSupportService = async (
  data: EditTechnicalSupportData
): Promise<ApiBasicResponse> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST + "technical-support/update-report";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
