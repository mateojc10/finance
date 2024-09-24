import axios from "axios";
import { ApiBasicResponse } from "../../../models/apiBasicResponse.model";
import { CreateTechnicalSupportData } from "../models/technicalSupport.model";

export const createThecnicalSupportRequestService = async (
  data: CreateTechnicalSupportData
): Promise<ApiBasicResponse> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST + "technical-support/create-report";
  const responseWithAxios = await axios.post(urlLogin, data);
  return responseWithAxios.data;
};
export const getTechnicalSupportByIdUserRequestService = async (
  idUser: number
): Promise<ApiBasicResponse> => {
  const urlLogin =
    process.env.REACT_APP_API_HOST +
    `technical-support/get-report-by-id/${idUser}`;
  const responseWithAxios = await axios.get(urlLogin);
  return responseWithAxios.data;
};
