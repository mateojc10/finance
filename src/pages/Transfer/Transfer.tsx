import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { transactionData } from "../../utilities/datosbase";
import { TransactionData } from "../../models/enviroment.model";
import { Badge } from "primereact/badge";
function Transfer(): JSX.Element {
  const idUser = localStorage.getItem("idUser");
  const [tableTransaction, setTableTransaction] = useState<TransactionData[]>(
    []
  );
  useEffect(() => {
    const findTransactionById = transactionData.filter(
      (transaction) => transaction.idUser === Number(idUser)
    );
    console.log("findTransactionById", findTransactionById);

    if (findTransactionById) {
      setTableTransaction(findTransactionById);
    }
  }, []);

  return (
    <>
      <SidebarComponent />
      <div className="grid">
        <div className="col text-center">
          <h1>Historial de movimientos</h1>
        </div>
        <div className="col-12 m-8">
          <DataTable
            value={tableTransaction}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="id" header="transacción id" />
            <Column field="date" header="Fecha registro" />
            <Column field="type" header="Tipo" />
            <Column field="description" header="Descripción" />
            <Column field="amount" header="Cantidad" />
            <Column
              field="withdrawalRequestDate"
              header="Solicitud de retiro"
              body={(rowData) =>
                rowData.withdrawalRequestDate ? (
                  <Badge value={rowData.withdrawalRequestDate} />
                ) : (
                  "No"
                )
              }
            />
          </DataTable>
        </div>
      </div>
    </>
  );
}

export default Transfer;
