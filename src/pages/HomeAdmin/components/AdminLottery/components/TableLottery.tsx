import { DataTable } from "primereact/datatable";
import { ApiLotteryData } from "../model/adminLottery.model";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";

interface Props {
  lotteryData: ApiLotteryData[];
  setDataLotteryRow: (data: ApiLotteryData) => void;
  setDialogEditLottery: (data: boolean) => void;
}
function TableLottery({
  lotteryData,
  setDataLotteryRow,
  setDialogEditLottery,
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
        value={lotteryData}
        resizableColumns
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No hay resultados"
        globalFilter={globalFilter}
        header={headerSearch}
        paginator={lotteryData.length > 5 ? true : false}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column field="idLottery" header="id"></Column>
        <Column
          field="descriptionLottery"
          header="Descripción del sorteo"
        ></Column>
        <Column field="numberLottery" header="Número ganador"></Column>
        <Column field="rewardLottery" header="Valor ganancía"></Column>
        <Column field="dateLottery" header="Fecha registro"></Column>
        <Column field="dateEndLottery" header="Fecha finaliza sorteo"></Column>
        <Column
          field="stateLottery"
          header="Estado"
          body={(data) =>
            data.stateLottery ? (
              <Badge value={"Activo"} severity={"success"}></Badge>
            ) : (
              <Badge value={"Inactivo"} severity={"danger"}></Badge>
            )
          }
        ></Column>
        <Column
          header="Acciones"
          body={(data) => (
            <div className="flex justify-content-center">
              <Button
                tooltip="Editar sorteo"
                tooltipOptions={{ position: "top" }}
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => {
                  setDataLotteryRow(data);
                  setDialogEditLottery(true);
                }}
              ></Button>
            </div>
          )}
        ></Column>
      </DataTable>
    </div>
  );
}

export default TableLottery;
