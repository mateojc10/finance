import { ProfileUserData } from "../../HomeAdmin/components/AdminUsers/models/adminUsers.model";

export interface WithdrawalRequest {
  idWithdrawalRequest: number;
  idUser: number;
  idLottery: number;
  dateWithdrawalRequest: Date | string;
  responseWithdrawalRequest?: null;
  dateResponse?: Date | string | null;
  user?: ProfileUserData;
}
export interface RegisterWithdrawalRequest {
  idUser: number;
  idLottery: number;
}
export interface UpdateFormWithdrawalRequest {
  idWithdrawalRequest: number;
  responseWithdrawalRequest: string;
  dateResponse: Date | string | null;
}

export interface ActuallyResponseIdLotteryIdUserRequest {
  idUser: number;
  idLottery: number;
}
