import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { WithdrawalRequest } from "../../../../Transfer/models/transfer.model";
import { Calendar } from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { AddNewWithdrawalRequest } from "../models/withdrawalRequest.model";
import { addNewResponseWithdrawalRequestService } from "../services/withdrawalRequest.service";
import { formatDateResponse } from "../../../../../utilities/dateFormat";
import { ToastControlBackendModel } from "../../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";

interface Props {
  ActuallyResponseDatarow: WithdrawalRequest;
  setDialogWithResponse: (data: boolean) => void;
  getAllWithdrawalRequestData: () => void;
  setMessageBackend: (value: ToastControlBackendModel) => void;
}

function FormAddNewResponseRequest({
  ActuallyResponseDatarow: ActuallyResponseDataRow,
  setDialogWithResponse,
  getAllWithdrawalRequestData,
  setMessageBackend,
}: Props): JSX.Element {
  const [responseNewWithdrawalRequest, setResponseNewWithdrawalRequest] =
    useState<string>("");
  const [dateResponse, setDateResponse] = useState<Nullable<Date>>(null);

  const onSubmit = async () => {
    try {
      const data: AddNewWithdrawalRequest = {
        idUser: ActuallyResponseDataRow.user
          ? ActuallyResponseDataRow.user?.idUser
          : 0,
        idLottery: ActuallyResponseDataRow.idLottery,
        dateWithdrawalRequest: formatDateResponse(
          String(ActuallyResponseDataRow.dateWithdrawalRequest)
        ),
        responseWithdrawalRequest: responseNewWithdrawalRequest,
        dateResponse: dateResponse
          ? formatDateResponse(dateResponse?.toISOString().split("T")[0])
          : new Date().toISOString().split("T")[0],
      };

      const response = await addNewResponseWithdrawalRequestService(data);
      if (response) {
        setDialogWithResponse(false);
        getAllWithdrawalRequestData();
      }
    } catch (error) {
      setMessageBackend({
        severityValue: "error",
        detailValue: "Error al registrar respuesta",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    } finally {
      setMessageBackend({
        severityValue: "success",
        detailValue: "Respuesta registrada con exito",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    }
  };

  return (
    <form className="grid m-4 text-center">
      <div className="col-12 md:col-4 sm:col-12">
        <InputText
          className="w-full"
          type="text"
          placeholder="Agregar respuesta"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setResponseNewWithdrawalRequest(e.target.value);
          }}
          autoFocus
        />
      </div>
      <div className="col-12">
        <div className="field col-12 md:col-4">
          <Calendar
            id="dateEndLottery"
            value={dateResponse}
            onChange={(e) => setDateResponse(e.value)}
            dateFormat="yy-mm-dd"
            placeholder="Fecha de respuesta"
            className="w-full"
            showIcon
          />
        </div>
      </div>
      <div className="col-12 col-4 md:col-3  sm:col-12">
        <Button
          className="mt-2  text-white"
          label="Responder"
          disabled={responseNewWithdrawalRequest.length > 2 ? false : true}
          onClick={() => {
            setResponseNewWithdrawalRequest("");
            onSubmit();
          }}
        />
      </div>
    </form>
  );
}

export default FormAddNewResponseRequest;
