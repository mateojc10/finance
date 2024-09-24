import { formatDate } from "../../../../../utilities/dateFormat";
import { ApiLotteryData } from "../model/adminLottery.model";

export const lotteryTableDataAdapter = (
  data: ApiLotteryData[]
): ApiLotteryData[] => {
  return data
    .map((data) => {
      return {
        ...data,
        dateLottery: data.dateLottery
          ? formatDate(String(data.dateLottery))
          : "",
        dateEndLottery: data.dateEndLottery
          ? formatDate(String(data.dateEndLottery))
          : "",
      };
    })
    .sort((a, b) => b.idLottery - a.idLottery);
};
