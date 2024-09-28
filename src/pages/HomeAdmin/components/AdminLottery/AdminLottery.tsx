import { useEffect, useState } from "react";
import TabMenuAdmin from "../TabMenuAdmin/TabMenuAdmin";
import { getAllLotteryService } from "./services/adminLottery.service";
import { ApiLotteryData } from "./model/adminLottery.model";
import { lotteryTableDataAdapter } from "./adpaters/adminLottery.adapter";
import TableLottery from "./components/TableLottery";
import { Dialog } from "primereact/dialog";
import FormCreateLottery from "./components/FormCreateLottery";
import FormEditLottery from "./components/FormEditLottery";
import { useNavigate } from "react-router-dom";
import { ToastControlBackendModel } from "../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";
import ToastBackControl from "../../../../components/Sidebar/ToastBackControl/ToastBackControl";

function AdminLottery(): JSX.Element {
  const isAdminValue = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const [lotteryData, setLotteryData] = useState<ApiLotteryData[]>([]);
  const [dataLotteryRow, setDataLotteryRow] = useState<ApiLotteryData>();
  const [dialogEditLottery, setDialogEditLottery] = useState(false);
  const [messageBackend, setMessageBackend] =
    useState<ToastControlBackendModel>({
      severityValue: "info",
      detailValue: "",
      lifeValue: 3000,
      validateShowMessage: false,
    });
  const getAllLottery = async () => {
    try {
      const response = await getAllLotteryService();
      if (response.length > 0) {
        setLotteryData(lotteryTableDataAdapter(response));
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isAdminValue !== "1") {
      navigate("/");
    }
    getAllLottery();
  }, []);
  return (
    <div>
      <TabMenuAdmin />
      <h2 className="text-center m-4">Administración de sorteos</h2>

      <>
        {messageBackend.validateShowMessage && (
          <ToastBackControl
            validateShowMessage={messageBackend.validateShowMessage}
            detailValue={messageBackend.detailValue}
            lifeValue={messageBackend.lifeValue}
            severityValue={messageBackend.severityValue}
          />
        )}
        <div className="col-12 md:col-8 text-center ml-8">
          <FormCreateLottery
            getAllLotteryData={getAllLottery}
            setMessageBackend={setMessageBackend}
          />
        </div>
        {lotteryData.length > 0 && (
          <TableLottery
            lotteryData={lotteryData}
            setDataLotteryRow={setDataLotteryRow}
            setDialogEditLottery={setDialogEditLottery}
          />
        )}
        {dataLotteryRow && (
          <Dialog
            header={`Editar Sorteo ${dataLotteryRow.idLottery}`}
            visible={dialogEditLottery}
            onHide={() => setDialogEditLottery(false)}
          >
            <FormEditLottery
              dataLottery={dataLotteryRow}
              getAllLotteryData={getAllLottery}
              setDialogEditLottery={setDialogEditLottery}
              setMessageBackend={setMessageBackend}
            />
          </Dialog>
        )}
      </>
    </div>
  );
}

export default AdminLottery;
