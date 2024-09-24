import { useEffect, useState } from "react";
import TabMenuAdmin from "../TabMenuAdmin/TabMenuAdmin";
import TableTechnicalSupport from "./components/TableTechnicalSupport";
import { getAllTechnicalSupportService } from "./services/adminTechnicalSupport.service";
import { ApiTechnicalSupportData } from "./models/technicalSupport.model";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import FormEditTechnicalSupport from "./components/FormEditTechnicalSupport";

function AdminTechnicalSupport(): JSX.Element {
  const [technicalSupporDataTable, setTechnicalSupporDataTable] = useState<
    ApiTechnicalSupportData[]
  >([]);
  const [rowData, setRowData] = useState<ApiTechnicalSupportData>();
  const [showDialogAddResponse, setShowDialogAddResponse] = useState(false);
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
    getAllTechnicalSupport();
  }, []);

  return (
    <div>
      <TabMenuAdmin />
      <div className="grid m-6">
        <div className="col-12 md:col-12 sm:col-12">
          <h1 className="text-center">Reportes a soporte técnico</h1>
        </div>
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
            />
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default AdminTechnicalSupport;
