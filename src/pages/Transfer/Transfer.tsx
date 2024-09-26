import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { useEffect, useState } from "react";
import { getAllTransferByUserService } from "./services/transfer.service";
import { WithdrawalRequest } from "./models/transfer.model";
import TableTransfer from "./components/TableTransfer";
import { dataTableTransferAdapter } from "./adapters/transfer.adapter";
function Transfer(): JSX.Element {
  const idUser = localStorage.getItem("idUser");
  const [tableTransaction, setTableTransaction] = useState<WithdrawalRequest[]>(
    []
  );

  const getAllTransferByUser = async (): Promise<void> => {
    try {
      if (idUser) {
        const getAllTransfer = await getAllTransferByUserService(+idUser);
        if (getAllTransfer.length > 0 && getAllTransfer[0] !== null) {
          setTableTransaction(dataTableTransferAdapter(getAllTransfer));
        }
      } else {
        window.location.href = "/";
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllTransferByUser();
  }, [idUser]);
  useEffect(() => {
    getAllTransferByUser();
  }, []);
  return (
    <div className="mt-8">
      <SidebarComponent />
      <div className="grid">
        <div className="col-12 md:col-12 sm:col-12 text-center ml-4">
          <h1>Historial de movimientos</h1>
        </div>
        <div className="col-12 md:col-8 sm:col-12 m-8">
          <TableTransfer tableTransaction={tableTransaction} />
        </div>
      </div>
    </div>
  );
}

export default Transfer;
