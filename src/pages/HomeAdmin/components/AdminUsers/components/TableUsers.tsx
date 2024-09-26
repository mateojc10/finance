import { DataTable } from "primereact/datatable";
import { ProfileUserData } from "../models/adminUsers.model";
import { Column } from "primereact/column";
import { Badge } from "primereact/badge";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { Button } from "primereact/button";

interface Props {
  userData: ProfileUserData[];
  setDataUser: (data: ProfileUserData) => void;
  setDialogEditUser: (data: boolean) => void;
  setDialogChangePasswordUser: (data: boolean) => void;
  setDialogLotteryToUser: (data: boolean) => void;
  findLotteryByUser: (idUser: number) => void;
}
function TableUsers({
  userData,
  setDataUser,
  setDialogEditUser,
  setDialogChangePasswordUser,
  setDialogLotteryToUser,
  findLotteryByUser,
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
    <div className="mr-8">
      <DataTable
        value={userData}
        resizableColumns
        showGridlines
        tableStyle={{ minWidth: "50rem" }}
        emptyMessage="No hay resultados"
        globalFilter={globalFilter}
        header={headerSearch}
        paginator={userData.length > 5 ? true : false}
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
      >
        <Column
          field="idUser"
          header="ID"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="user"
          header="Usuario"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="name"
          header="Nombre"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="lastName"
          header="Apellido"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="phone"
          header="Teléfono"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="balance"
          header="Saldo"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="role"
          header="Rol"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="state"
          header="Estado"
          sortable
          style={{ width: "25%" }}
          body={(data) =>
            data.state ? (
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
                tooltip="Editar usuario"
                tooltipOptions={{ position: "top" }}
                icon="pi pi-pencil"
                className="p-button-rounded p-button-info mr-2"
                onClick={() => {
                  setDataUser(data);
                  setDialogEditUser(true);
                }}
              ></Button>
              <Button
                tooltip="Cambiar contraseña"
                tooltipOptions={{ position: "top" }}
                icon="pi pi-key"
                className="p-button-rounded p-button-warning mr-2"
                onClick={() => {
                  setDataUser(data);
                  setDialogChangePasswordUser(true);
                }}
              ></Button>
              <Button
                tooltip="Agregar sorteo"
                tooltipOptions={{ position: "top" }}
                icon="pi pi-dollar"
                className="p-button-rounded p-button-success mr-2"
                onClick={() => {
                  setDataUser(data);
                  findLotteryByUser(data.idUser);
                  setDialogLotteryToUser(true);
                }}
              ></Button>
            </div>
          )}
        ></Column>
      </DataTable>
    </div>
  );
}

export default TableUsers;
