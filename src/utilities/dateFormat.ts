import moment from "moment";

export const formatDate = (registrationEntryDate: string): string => {
  return registrationEntryDate
    ? moment(registrationEntryDate).format("DD/MM/YYYY")
    : "";
};
