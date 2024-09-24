import { formatDate } from "../../../utilities/dateFormat";
import {
  ApiTechnicalSupportData,
  TechnicalSupportData,
} from "../models/technicalSupport.model";

export const dataTabletechnicalSupportAdapter = (
  data: TechnicalSupportData[]
): ApiTechnicalSupportData[] => {
  return data?.map((data) => {
    return {
      ...data,
      dateApplication: formatDate(String(data.dateApplication)),
      descriptionResult: data.descriptionResult
        ? data.descriptionResult
        : "Esperando respuesta",
      dateResult: data.dateResult
        ? formatDate(String(data.dateResult))
        : "Esperando respuesta",
    };
  });
};
