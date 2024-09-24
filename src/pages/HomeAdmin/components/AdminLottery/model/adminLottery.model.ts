export interface CreateLotteryForm {
  descriptionLottery: string;
  rewardLottery: number;
  dateEndLottery: Date | null | undefined | string;
}
export interface ApiLotteryData {
  idLottery: number;
  descriptionLottery: string;
  numberLottery: number | null;
  rewardLottery: number;
  dateLottery: Date | string;
  dateEndLottery: Date | string;
  stateLottery: boolean;
}
export interface UpdateLotteryForm {
  idLottery: number;
  descriptionLottery: string;
  numberLottery: number | null;
  rewardLottery: number;
  dateEndLottery: Date | null | undefined | string;
  stateLottery: boolean;
}
