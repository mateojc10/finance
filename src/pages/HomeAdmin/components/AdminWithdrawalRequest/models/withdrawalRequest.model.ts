export interface AddNewWithdrawalRequest {
  idUser: number;
  idLottery: number;
  dateWithdrawalRequest: Date | null | undefined | string;
  responseWithdrawalRequest: String;
  dateResponse: Date | null | undefined | string;
}
