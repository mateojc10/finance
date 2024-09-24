import { ProfileUserData } from "../../HomeAdmin/components/AdminUsers/models/adminUsers.model";

export const lotteryDataAdapter = (data: ProfileUserData): ProfileUserData => {
  return {
    ...data,
    lottery: data.lottery?.sort((a, b) => b.idLottery - a.idLottery),
  };
};
