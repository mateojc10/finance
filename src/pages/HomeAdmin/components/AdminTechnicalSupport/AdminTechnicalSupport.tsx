import { useEffect, useState } from "react";
import TabMenuAdmin from "../TabMenuAdmin/TabMenuAdmin";
import TableTechnicalSupport from "./components/TableTechnicalSupport";
import { getAllTechnicalSupportService } from "./services/adminTechnicalSupport.service";
import { ApiTechnicalSupportData } from "./models/technicalSupport.model";
import { Dialog } from "primereact/dialog";
import FormEditTechnicalSupport from "./components/FormEditTechnicalSupport";
import { useNavigate } from "react-router-dom";
import { ToastControlBackendModel } from "../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";
import ToastBackControl from "../../../../components/Sidebar/ToastBackControl/ToastBackControl";

function AdminTechnicalSupport(): JSX.Element {
  const isAdminValue = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const [technicalSupporDataTable, setTechnicalSupporDataTable] = useState<
    ApiTechnicalSupportData[]
  >([]);
  const [rowData, setRowData] = useState<ApiTechnicalSupportData>();
  const [showDialogAddResponse, setShowDialogAddResponse] = useState(false);
  const [messageBackend, setMessageBackend] =
    useState<ToastControlBackendModel>({
      severityValue: "info",
      detailValue: "",
      lifeValue: 3000,
      validateShowMessage: false,
    });
  const getAllTechnicalSupport = async () => {
    try {
      const response = await getAllTechnicalSupportService();
      if (response) {
        setTechnicalSupporDataTable(response);
        console.log(response);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (isAdminValue !== "1") {
      navigate("/");
    }
    getAllTechnicalSupport();
  }, []);

  return (
    <div>
      <TabMenuAdmin />
      <div className="grid m-6">
        <div className="col-12 md:col-12 sm:col-12">
          <h1 className="text-center">Reportes a soporte técnico</h1>
        </div>
        {messageBackend.validateShowMessage && (
          <ToastBackControl
            validateShowMessage={messageBackend.validateShowMessage}
            detailValue={messageBackend.detailValue}
            lifeValue={messageBackend.lifeValue}
            severityValue={messageBackend.severityValue}
          />
        )}
        <TableTechnicalSupport
          technicalSupporDataTable={technicalSupporDataTable}
          setRowData={setRowData}
          setShowDialogAddResponse={setShowDialogAddResponse}
        />
        {rowData && (
          <Dialog
            header={`Respuesta al reporte ${rowData.idTechnicalSupport}`}
            visible={showDialogAddResponse}
            onHide={() => setShowDialogAddResponse(false)}
          >
            <FormEditTechnicalSupport
              setShowDialogAddResponse={setShowDialogAddResponse}
              idTechnicalSupport={rowData.idTechnicalSupport}
              getAllTechnicalSupport={getAllTechnicalSupport}
              setMessageBackend={setMessageBackend}
            />
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default AdminTechnicalSupport;
