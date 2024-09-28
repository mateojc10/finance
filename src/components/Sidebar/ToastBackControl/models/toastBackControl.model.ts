export interface ToastControlBackendModel {
  severityValue:
    | "info"
    | "success"
    | "warn"
    | "error"
    | "secondary"
    | "contrast";
  detailValue: string;
  lifeValue: number;
  validateShowMessage: boolean;
}
