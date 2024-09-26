import { TechnicalSupportData } from "../../../../TechnicalSupport/models/technicalSupport.model";
import { WithdrawalRequest } from "../../../../Transfer/models/transfer.model";
import { ApiLotteryData } from "../../AdminLottery/model/adminLottery.model";

export interface ProfileUserData {
  idUser: number;
  user: string;
  name: string;
  lastName: string;
  phone: string;
  role: string;
  state: true;
  password?: string;
  balance: number;
  technicalSupport?: TechnicalSupportData[];
  withdrawalRequest?: WithdrawalRequest[];
  lottery?: ApiLotteryData[];
}
export interface CreateUserForm {
  user: string;
  password: string;
  name: string;
  lastName: string;
  phone: string;
  role: string;
  balance: number;
}
export interface EditUserAdminForm {
  idUser: number;
  user: string;
  name: string;
  lastName: string;
  phone: string;
  role: string;
  state: boolean;
  balance: number;
}
export interface DropdownField {
  name: string;
  code: string;
}
export interface ChangePasswordUser {
  idUser: number;
  password: string;
}
export interface AssociateLotteryToUser {
  idUser: number;
  idLottery: number;
}
