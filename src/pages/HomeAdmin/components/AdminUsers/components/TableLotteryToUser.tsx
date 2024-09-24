import { useEffect, useState } from "react";
import { getDataUserByIdservice } from "../../../../Profile/services/profile.service";
import { ApiLotteryData } from "../../AdminLottery/model/adminLottery.model";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";

interface Props {
  dataLotteryForUser: ApiLotteryData[];
}
function TableLotteryToUser({ dataLotteryForUser }: Props): JSX.Element {
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
        value={dataLotteryForUser}
        resizableColumns
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No hay resultados"
        globalFilter={globalFilter}
        header={dataLotteryForUser.length > 5 ? headerSearch : null}
        paginator={dataLotteryForUser.length > 5 ? true : false}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column
          field="idLottery"
          header="ID"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="descriptionLottery"
          header="Detalle"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="rewardLottery"
          header="Ganancía estimada"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="stateLottery"
          header="Estado del sorteo"
          sortable
          style={{ width: "25%" }}
          body={(rowData: ApiLotteryData) => {
            return (
              <Badge
                severity={rowData.stateLottery ? "success" : "danger"}
                value={rowData.stateLottery ? "Activo" : "Inactivo"}
              />
            );
          }}
        ></Column>
      </DataTable>
    </div>
  );
}

export default TableLotteryToUser;
