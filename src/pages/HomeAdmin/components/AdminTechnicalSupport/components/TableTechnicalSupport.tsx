import { DataTable } from "primereact/datatable";
import { ApiTechnicalSupportData } from "../models/technicalSupport.model";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

interface Props {
  technicalSupporDataTable: ApiTechnicalSupportData[];
  setRowData: (data: ApiTechnicalSupportData) => void;
  setShowDialogAddResponse: (data: boolean) => void;
}
function TableTechnicalSupport({
  technicalSupporDataTable,
  setRowData,
  setShowDialogAddResponse,
}: Props): JSX.Element {
  const [globalFilter, setGlobalFilter] = useState<string | null>(null);
  const headerSearch = (
    <InputText
      className="p-inputtext p-component col-4 md:col-2 sm:col-12 flex md:col-offset-9 sm:col-offset-0"
      type="text"
      placeholder="Buscar..."
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(e.target.value);
      }}
    />
  );
  return (
    <div>
      <DataTable
        value={technicalSupporDataTable}
        resizableColumns
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No existen solicitudes"
        globalFilter={globalFilter}
        header={headerSearch}
        paginator={technicalSupporDataTable.length > 5 ? true : false}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="idTechnicalSupport" header="id"></Column>
        <Column field="user.name" header="Nombre"></Column>
        <Column field="user.lastName" header="Apellido"></Column>
        <Column field="description" header="Solicitud"></Column>
        <Column field="dateApplication" header="Fecha registro"></Column>
        <Column field="descriptionResult" header="Respuesta"></Column>
        <Column field="dateResult" header="Fecha respuesta"></Column>
        <Column
          header="Acción"
          body={(data) => (
            <Button
              tooltip="Responder"
              tooltipOptions={{ position: "top" }}
              icon="pi pi-plus"
              className="p-button-rounded p-button-primary p-button-outlined"
              onClick={() => {
                setRowData(data);
                setShowDialogAddResponse(true);
              }}
            ></Button>
          )}
        ></Column>
      </DataTable>
    </div>
  );
}

export default TableTechnicalSupport;
