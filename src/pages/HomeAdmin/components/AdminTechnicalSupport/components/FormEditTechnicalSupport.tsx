import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { EditTechnicalSupportData } from "../models/technicalSupport.model";
import { useEffect, useState } from "react";
import { updateTechnicalSupportService } from "../services/adminTechnicalSupport.service";
import { ToastControlBackendModel } from "../../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";

interface Props {
  idTechnicalSupport: number;
  setShowDialogAddResponse: (data: boolean) => void;
  getAllTechnicalSupport: () => void;
  setMessageBackend: (value: ToastControlBackendModel) => void;
}
function FormEditTechnicalSupport({
  idTechnicalSupport,
  setShowDialogAddResponse,
  getAllTechnicalSupport,
  setMessageBackend,
}: Props): JSX.Element {
  const [descriptionResult, setDescriptionResult] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const dataForResponse: EditTechnicalSupportData = {
        idTechnicalSupport,
        descriptionResult,
      };
      const response = await updateTechnicalSupportService(dataForResponse);
      if (response) {
        setShowDialogAddResponse(false);
        getAllTechnicalSupport();
        setMessageBackend({
          severityValue: "success",
          detailValue: "Respuesta registrada con éxito",
          lifeValue: 3000,
          validateShowMessage: true,
        });
      }
    } catch (error) {
      setMessageBackend({
        severityValue: "error",
        detailValue: "Error al registrar la respuesta",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (descriptionResult.length > 2) {
      setLoading(false);
    }
  }, [descriptionResult]);

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
          <Button
            label="Guardar"
            className="text-white"
            onClick={onSubmit}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default FormEditTechnicalSupport;
