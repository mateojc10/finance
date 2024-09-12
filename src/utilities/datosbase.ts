import {
  LoginAccessData,
  ProfileUserData,
  TransactionData,
} from "../models/enviroment.model";

export const loginData: LoginAccessData[] = [
  {
    idUser: 1,
    userName: "admin",
    password: "admin",
    role: "admin",
  },
  {
    idUser: 2,
    userName: "Felipe",
    password: "12345",
    role: "basico",
  },
  {
    idUser: 3,
    userName: "luisa",
    password: "12345",
    role: "admin",
  },
];

export let ProfileData: ProfileUserData[] = [
  {
    idUser: 1,
    name: "Admin",
    lastName: "Admin",
    email: "admin@bifinancing",
    password: "admin",
    role: "admin",
    userName: "admin",
    phone: "123456789",
  },
  {
    idUser: 2,
    name: "Felipe",
    lastName: "Pérez",
    email: "felipe@bifinancing",
    password: "12345",
    role: "basico",
    userName: "Felipe",
    phone: "123456789",
  },
  {
    idUser: 3,
    name: "Luisa",
    lastName: "Rojas",
    email: "luisa@bifinancing",
    password: "12345",
    role: "admin",
    userName: "luisa",
    phone: "123456789",
  },
];
export const transactionData: TransactionData[] = [
  {
    id: 1,
    idUser: 1,
    date: "2022-07-15",
    type: "Ingreso",
    amount: 1000,
    description: "Ingreso inicial",
    withdrawalRequestDate: "2022-07-15",
  },
  {
    id: 2,
    idUser: 2,
    date: "2022-07-15",
    type: "Ingreso",
    amount: 1000,
    description: "Ingreso inicial",
    withdrawalRequestDate: "2022-07-15",
  },
  {
    id: 3,
    idUser: 3,
    date: "2022-07-15",
    type: "Ingreso",
    amount: 1000,
    description: "Ingreso inicial",
    withdrawalRequestDate: "2022-07-15",
  },
];
