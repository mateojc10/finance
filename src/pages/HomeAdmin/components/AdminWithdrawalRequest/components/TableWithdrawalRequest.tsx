import { DataTable } from "primereact/datatable";
import { WithdrawalRequest } from "../../../../Transfer/models/transfer.model";
import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";

interface Props {
  dataWithoutResponse: WithdrawalRequest[];
  setDataWithoutResponseRow: (data: WithdrawalRequest) => void;
  setDialogResponse: (data: boolean) => void;
}
function TableWithdrawalRequest({
  dataWithoutResponse,
  setDataWithoutResponseRow,
  setDialogResponse,
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
        value={dataWithoutResponse}
        resizableColumns
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No hay resultados"
        globalFilter={globalFilter}
        header={headerSearch}
        paginator={dataWithoutResponse.length > 5 ? true : false}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="idWithdrawalRequest" header="ID" />
        <Column field={"user.name"} header="Nombre" />
        <Column field={"user.lastName"} header="Apellido" />
        <Column field={"user.phone"} header="Teléfono" />
        <Column field="idLottery" header="Id Sorteo" />
        <Column field="dateWithdrawalRequest" header="Fecha solicitud" />
        <Column
          field="responseWithdrawalRequest"
          header="Respuesta"
          body={(data: WithdrawalRequest) => {
            if (data.responseWithdrawalRequest === null) {
              return <Badge value="Pendiente" severity="warning" />;
            } else {
              return <Badge value="Resuelto" severity="success" />;
            }
          }}
        />
        <Column
          field="Acciones"
          header="Acciones"
          body={(data) => (
            <div className="flex justify-content-center">
              <Button
                tooltip="Responder"
                tooltipOptions={{ position: "top" }}
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => {
                  console.log("data", data);
                  setDataWithoutResponseRow(data);
                  setDialogResponse(true);
                }}
              ></Button>
            </div>
          )}
        ></Column>
      </DataTable>
    </div>
  );
}

export default TableWithdrawalRequest;
