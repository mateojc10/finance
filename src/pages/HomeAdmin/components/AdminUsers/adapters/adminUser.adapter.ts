import { ApiLotteryData } from "../../AdminLottery/model/adminLottery.model";
import { DropdownField, ProfileUserData } from "../models/adminUsers.model";

export const userDataAdapter = (data: ProfileUserData[]): ProfileUserData[] => {
  return data.sort((a, b) => b.idUser - a.idUser);
};

export const lotteryActiveDataDropdownAdapter = (
  data: ApiLotteryData[]
): DropdownField[] => {
  return data
    .filter((data) => data.stateLottery)
    .map((data) => {
      return {
        name: data.descriptionLottery,
        code: String(data.idLottery),
      };
    });
};
