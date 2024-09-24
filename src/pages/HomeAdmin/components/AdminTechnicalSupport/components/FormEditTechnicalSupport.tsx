import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { EditTechnicalSupportData } from "../models/technicalSupport.model";
import { useState } from "react";
import { updateTechnicalSupportService } from "../services/adminTechnicalSupport.service";

interface Props {
  idTechnicalSupport: number;
  setShowDialogAddResponse: (data: boolean) => void;
  getAllTechnicalSupport: () => void;
}
function FormEditTechnicalSupport({
  idTechnicalSupport,
  setShowDialogAddResponse,
  getAllTechnicalSupport,
}: Props): JSX.Element {
  const [descriptionResult, setDescriptionResult] = useState<string>("");
  const onSubmit = async () => {
    try {
      const dataForResponse: EditTechnicalSupportData = {
        idTechnicalSupport,
        descriptionResult,
      };
      const response = await updateTechnicalSupportService(dataForResponse);
      if (response) {
        setShowDialogAddResponse(false);
        getAllTechnicalSupport();
      }
    } catch (error) {}
  };
  return (
    <div>
      <form className="grid text-center">
        <div className="col-12 md:col-12 sm:col-12">
          <InputText
            type="text"
            placeholder="Respuesta"
            className="w-full"
            onChange={(e) => setDescriptionResult(e.target.value)}
          />
        </div>
        <div className="col">
          <Button label="Guardar" onClick={onSubmit} />
        </div>
      </form>
    </div>
  );
}

export default FormEditTechnicalSupport;
