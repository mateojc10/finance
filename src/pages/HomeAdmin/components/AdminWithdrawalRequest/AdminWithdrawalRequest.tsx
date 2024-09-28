import { useEffect, useState } from "react";
import TabMenuAdmin from "../TabMenuAdmin/TabMenuAdmin";
import TableWithdrawalRequest from "./components/TableWithdrawalRequest";
import { getAllWithdrawalRequestService } from "./services/withdrawalRequest.service";
import { WithdrawalRequest } from "../../../Transfer/models/transfer.model";

import { Dialog } from "primereact/dialog";
import FormEditWitdrawalRequest from "./components/FormEditWitdrawalRequest";
import { useNavigate } from "react-router-dom";
import ToastBackControl from "../../../../components/Sidebar/ToastBackControl/ToastBackControl";
import { ToastControlBackendModel } from "../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";

function AdminWithdrawalRequest(): JSX.Element {
  const isAdminValue = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const [dataWithdrawalResponse, setDataWithdrawalResponse] = useState<
    WithdrawalRequest[]
  >([]);
  const [dataWithdrawalResponseRow, setDataWithdrawalResponseRow] =
    useState<WithdrawalRequest>();
  const [dialogResponse, setDialogResponse] = useState<boolean>(true);
  const [messageBackend, setMessageBackend] =
    useState<ToastControlBackendModel>({
      severityValue: "info",
      detailValue: "",
      lifeValue: 3000,
      validateShowMessage: false,
    });
  const getAllWithdrawalRequest = async () => {
    try {
      const response = await getAllWithdrawalRequestService();
      if (response) {
        setDataWithdrawalResponse(response);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (isAdminValue !== "1") {
      navigate("/");
    }
    getAllWithdrawalRequest();
  }, []);
  return (
    <div>
      <TabMenuAdmin />
      <div className="grid text-center mt-6 mb-6">
        <div className="col-12 md:col-12 sm:col-12">
          <h1>Solicitudes de retiro</h1>
        </div>
        {messageBackend.validateShowMessage && (
          <ToastBackControl
            validateShowMessage={messageBackend.validateShowMessage}
            detailValue={messageBackend.detailValue}
            lifeValue={messageBackend.lifeValue}
            severityValue={messageBackend.severityValue}
          />
        )}
        <div className="col-12 m-6">
          <TableWithdrawalRequest
            setDialogResponse={setDialogResponse}
            setDataWithoutResponseRow={setDataWithdrawalResponseRow}
            dataWithoutResponse={dataWithdrawalResponse}
          />
        </div>
        {dataWithdrawalResponseRow && (
          <Dialog
            header={`Respuesta a solicitud de retiro ${dataWithdrawalResponseRow?.idWithdrawalRequest}`}
            visible={dialogResponse}
            onHide={() => setDialogResponse(false)}
          >
            <FormEditWitdrawalRequest
              getAllWithdrawalRequestData={getAllWithdrawalRequest}
              setDialogEditWithdrawalRequest={setDialogResponse}
              idWithdrawalRequest={
                dataWithdrawalResponseRow?.idWithdrawalRequest
              }
              setMessageBackend={setMessageBackend}
            />
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default AdminWithdrawalRequest;
