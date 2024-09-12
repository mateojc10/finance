export interface LoginAccessData {
  idUser: number;
  userName: string;
  password: string;
  role: string;
}
export interface ProfileUserData {
  idUser: number;
  name: string;
  lastName: string;
  email: string;
  phone?: string;
  password: string;
  role: string;
  userName?: string;
}
export interface TransactionData {
  id: number;
  idUser: number;
  date: string;
  type: string;
  description: string;
  amount: number;
  withdrawalRequestDate?: string;
}
