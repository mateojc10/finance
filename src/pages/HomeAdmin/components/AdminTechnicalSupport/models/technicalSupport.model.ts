import { ProfileUserData } from "../../AdminUsers/models/adminUsers.model";

export interface ApiTechnicalSupportData {
  idTechnicalSupport: number;
  description: string;
  dateApplication: Date;
  descriptionResult: string | null;
  dateResult: Date | null;
  user: ProfileUserData;
}
export interface EditTechnicalSupportData {
  idTechnicalSupport: number;
  descriptionResult: string;
}
