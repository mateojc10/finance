export interface CreateTechnicalSupportData {
  idUser: number;
  description: string;
}
export interface TechnicalSupportData {
  idTechnicalSupport: number;
  description: string;
  dateApplication: Date;
  descriptionResult: string;
  dateResult: Date;
  idUser: number;
}

export interface ApiTechnicalSupportData {
  idTechnicalSupport: number;
  description: string;
  dateApplication: string;
  descriptionResult: string;
  dateResult: string;
  idUser: number;
}
