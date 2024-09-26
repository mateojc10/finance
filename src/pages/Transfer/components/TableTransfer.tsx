import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { WithdrawalRequest } from "../models/transfer.model";

interface Props {
  tableTransaction: WithdrawalRequest[];
}
function TableTransfer({ tableTransaction }: Props) {
  return (
    <DataTable
      value={tableTransaction}
      tableStyle={{ minWidth: "50rem" }}
      emptyMessage="No existen transacciones"
    >
      <Column field="idWithdrawalRequest" header="transacción id" />
      <Column
        field="idLottery"
        header="Concepto"
        body={(rowData) => (
          <p>{rowData?.lottery?.description}Solicitud de retiro</p>
        )}
      />
      <Column field="dateWithdrawalRequest" header="Fecha registro" />
      <Column field="responseWithdrawalRequest" header="Respuesta" />
      <Column field="dateResponse" header="Fecha respuesta" />
    </DataTable>
  );
}

export default TableTransfer;
