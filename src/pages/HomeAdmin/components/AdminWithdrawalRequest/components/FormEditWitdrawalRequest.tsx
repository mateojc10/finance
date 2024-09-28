import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { UpdateFormWithdrawalRequest } from "../../../../Transfer/models/transfer.model";
import { updateWithdrawalRequestService } from "../services/withdrawalRequest.service";
import { Button } from "primereact/button";
import { ToastControlBackendModel } from "../../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";
interface Props {
  idWithdrawalRequest: number;
  getAllWithdrawalRequestData: () => void;
  setDialogEditWithdrawalRequest: (data: boolean) => void;
  setMessageBackend: (value: ToastControlBackendModel) => void;
}
function FormEditWitdrawalRequest({
  idWithdrawalRequest,
  getAllWithdrawalRequestData,
  setDialogEditWithdrawalRequest,
  setMessageBackend,
}: Props): JSX.Element {
  const [responseWithdrawalRequest, setResponseWithdrawalRequest] =
    useState<string>("");
  const [loading, setLoading] = useState(true);
  const onSubmit = async () => {
    setLoading(true);
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
        setMessageBackend({
          severityValue: "success",
          detailValue: "Respuesta registrada con exito",
          lifeValue: 3000,
          validateShowMessage: true,
        });
      }
    } catch (error) {
      setMessageBackend({
        severityValue: "error",
        detailValue: "Error al registrar respuesta",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (responseWithdrawalRequest.length > 2) {
      setLoading(false);
    }
  }, [responseWithdrawalRequest]);
  return (
    <div>
      <form className="grid text-center" onSubmit={onSubmit}>
        <div className="col-12 md:col-12 sm:col-12">
          <InputText
            className="w-full"
            type="text"
            placeholder="Respuesta"
            onChange={(e) => setResponseWithdrawalRequest(e.target.value)}
          />
          <Button
            className="mt-2 text-white"
            label="Enviar"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default FormEditWitdrawalRequest;
