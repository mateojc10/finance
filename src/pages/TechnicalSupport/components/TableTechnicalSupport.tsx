import { DataTable } from "primereact/datatable";
import { ApiTechnicalSupportData } from "../models/technicalSupport.model";
import { Column } from "primereact/column";

interface Props {
  technicalSupportData: ApiTechnicalSupportData[];
}

function TableTechnicalSupport({ technicalSupportData }: Props) {
  return (
    <div>
      <DataTable value={technicalSupportData}>
        <Column field="idTechnicalSupport" header="id" />
        <Column field="description" header="Solicitud" />
        <Column field="dateApplication" header="Fecha reporte" />
        <Column field="descriptionResult" header="Respuesta" />
        <Column field="dateResult" header="Fecha respuesta" />
      </DataTable>
    </div>
  );
}

export default TableTechnicalSupport;
