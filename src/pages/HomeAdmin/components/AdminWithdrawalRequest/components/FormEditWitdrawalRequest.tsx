import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { UpdateFormWithdrawalRequest } from "../../../../Transfer/models/transfer.model";
import { updateWithdrawalRequestService } from "../services/withdrawalRequest.service";
import { Button } from "primereact/button";
interface Props {
  idWithdrawalRequest: number;
  getAllWithdrawalRequestData: () => void;
  setDialogEditWithdrawalRequest: (data: boolean) => void;
}
function FormEditWitdrawalRequest({
  idWithdrawalRequest,
  getAllWithdrawalRequestData,
  setDialogEditWithdrawalRequest,
}: Props): JSX.Element {
  const [responseWithdrawalRequest, setResponseWithdrawalRequest] =
    useState<string>("");

  const onSubmit = async () => {
    try {
      const dateToday = new Date().toISOString().split("T")[0];

      const dataForUpdate: UpdateFormWithdrawalRequest = {
        idWithdrawalRequest,
        responseWithdrawalRequest,
        dateResponse: dateToday,
      };

      const response = await updateWithdrawalRequestService(dataForUpdate);

      if (response) {
        getAllWithdrawalRequestData();
        setDialogEditWithdrawalRequest(false);
      }
    } catch (error) {}
  };
  return (
    <div>
      <form className="grid text-center">
        <div className="col-12 md:col-12 sm:col-12">
          <InputText
            className="w-full"
            type="text"
            placeholder="Respuesta"
            onChange={(e) => setResponseWithdrawalRequest(e.target.value)}
          />
          <Button
            className="mt-2"
            label="Enviar"
            onClick={onSubmit}
            disabled={responseWithdrawalRequest.length > 2 ? false : true}
          />
        </div>
      </form>
    </div>
  );
}

export default FormEditWitdrawalRequest;
