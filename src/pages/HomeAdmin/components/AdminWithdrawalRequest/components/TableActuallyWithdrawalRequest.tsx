import { DataTable } from "primereact/datatable";
import { WithdrawalRequest } from "../../../../Transfer/models/transfer.model";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Column } from "primereact/column";
interface Props {
  actuallyDataWithdrawalResponse: WithdrawalRequest[];
}
function TableActuallyWithdrawalRequest({
  actuallyDataWithdrawalResponse,
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
        value={actuallyDataWithdrawalResponse}
        resizableColumns
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No hay resultados"
        globalFilter={globalFilter}
        header={headerSearch}
        paginator={actuallyDataWithdrawalResponse.length > 5 ? true : false}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="idWithdrawalRequest" header="ID" />
        <Column field="dateWithdrawalRequest" header="Fecha solicitud" />
        <Column field="responseWithdrawalRequest" header="Respuesta" />
        <Column field="dateResponse" header="Fecha respuesta" />
      </DataTable>
    </div>
  );
}

export default TableActuallyWithdrawalRequest;
