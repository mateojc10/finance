import { formatDate } from "../../../utilities/dateFormat";
import { WithdrawalRequest } from "../models/transfer.model";

export const dataTableTransferAdapter = (
  data: WithdrawalRequest[]
): WithdrawalRequest[] => {
  return data.map((data) => {
    return {
      ...data,
      dateWithdrawalRequest: data.dateWithdrawalRequest
        ? formatDate(String(data.dateWithdrawalRequest))
        : "",
      dateResponse: data.dateResponse
        ? formatDate(String(data.dateResponse))
        : "",
    };
  });
};
