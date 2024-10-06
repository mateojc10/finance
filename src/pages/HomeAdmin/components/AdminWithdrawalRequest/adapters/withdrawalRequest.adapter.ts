import { formatDate } from "../../../../../utilities/dateFormat";
import { WithdrawalRequest } from "../../../../Transfer/models/transfer.model";

export const withdrawalRequestTableWithoutResponseDataAdapter = (
  data: WithdrawalRequest[]
): WithdrawalRequest[] => {
  return data
    .filter((data) => data.responseWithdrawalRequest === null)
    .map((data) => {
      return {
        ...data,
        dateWithdrawalRequest: data.dateWithdrawalRequest
          ? formatDate(String(data.dateWithdrawalRequest))
          : "",
      };
    })
    .sort((a, b) => b.idWithdrawalRequest - a.idWithdrawalRequest);
};

export const withdrawalRequestTableResponseDataAdapter = (
  data: WithdrawalRequest[]
): WithdrawalRequest[] => {
  return data
    .map((data) => {
      return {
        ...data,
        dateWithdrawalRequest: data.dateWithdrawalRequest
          ? formatDate(String(data.dateWithdrawalRequest))
          : "",
      };
    })
    .sort((a, b) => b.idWithdrawalRequest - a.idWithdrawalRequest);
};
