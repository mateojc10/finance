import { useEffect, useState } from "react";
import TabMenuAdmin from "../TabMenuAdmin/TabMenuAdmin";
import TableWithdrawalRequest from "./components/TableWithdrawalRequest";
import {
  actuallyResponseWithdrawalIdLotteryIdUserRequestService,
  getAllWithdrawalRequestService,
} from "./services/withdrawalRequest.service";
import {
  ActuallyResponseIdLotteryIdUserRequest,
  WithdrawalRequest,
} from "../../../Transfer/models/transfer.model";

import { Dialog } from "primereact/dialog";
import FormEditWitdrawalRequest from "./components/FormEditWitdrawalRequest";
import { useNavigate } from "react-router-dom";
import ToastBackControl from "../../../../components/Sidebar/ToastBackControl/ToastBackControl";
import { ToastControlBackendModel } from "../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";
import { withdrawalRequestTableResponseDataAdapter } from "./adapters/withdrawalRequest.adapter";
import TableActuallyWithdrawalRequest from "./components/TableActuallyWithdrawalRequest";
import FormAddNewResponseRequest from "./components/FormAddNewResponseRequest";

function AdminWithdrawalRequest(): JSX.Element {
  const isAdminValue = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const [dataWithdrawalResponse, setDataWithdrawalResponse] = useState<
    WithdrawalRequest[]
  >([]);
  const [dataWithdrawalResponseRow, setDataWithdrawalResponseRow] =
    useState<WithdrawalRequest>();
  const [actuallyDataWithdrawalResponse, setActuallyDataWithdrawalResponse] =
    useState<WithdrawalRequest[]>();
  const [dialogResponse, setDialogResponse] = useState<boolean>(true);

  const [dataWithResponseRow, setDataWithResponseRow] =
    useState<WithdrawalRequest>();
  const [dialogWithResponse, setDialogWithResponse] = useState<boolean>(true);

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
        setDataWithdrawalResponse(
          withdrawalRequestTableResponseDataAdapter(response)
        );
      }
    } catch (error) {}
  };
  const actuallyResponseLottery = async (
    data: ActuallyResponseIdLotteryIdUserRequest
  ) => {
    try {
      const response =
        await actuallyResponseWithdrawalIdLotteryIdUserRequestService(data);
      if (response) {
        setActuallyDataWithdrawalResponse(response);
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
      <div className="grid text-center mt-6 mb-6 mr-8">
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
            setDataWithResponseRow={setDataWithResponseRow}
            setDialogWithResponse={setDialogWithResponse}
            actuallyResponseLottery={actuallyResponseLottery}
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

        {dataWithResponseRow && (
          <Dialog
            header={`Agregar respuesta a solicitud de retiro ${dataWithResponseRow?.idWithdrawalRequest}`}
            visible={dialogWithResponse}
            onHide={() => setDialogWithResponse(false)}
          >
            {
              <>
                {actuallyDataWithdrawalResponse ? (
                  <>
                    <FormAddNewResponseRequest
                      ActuallyResponseDatarow={dataWithResponseRow}
                      setDialogWithResponse={setDialogWithResponse}
                      getAllWithdrawalRequestData={getAllWithdrawalRequest}
                      setMessageBackend={setMessageBackend}
                    />
                    <TableActuallyWithdrawalRequest
                      actuallyDataWithdrawalResponse={withdrawalRequestTableResponseDataAdapter(
                        actuallyDataWithdrawalResponse
                      )}
                    />
                  </>
                ) : (
                  <h2>No hay resultados</h2>
                )}
              </>
            }
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default AdminWithdrawalRequest;
