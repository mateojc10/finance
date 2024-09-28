import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { createThecnicalSupportRequestService } from "../services/technicalSupport.services";
import { ToastControlBackendModel } from "../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";
interface Props {
  idUser: number;
  getAllTechnicalSupportByUser: () => void;
  setMessageBackend: (value: ToastControlBackendModel) => void;
}
function FormTechnicalSupport({
  idUser,
  getAllTechnicalSupportByUser,
  setMessageBackend,
}: Props): JSX.Element {
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      const data = {
        idUser: Number(idUser),
        description: description,
      };
      const response = await createThecnicalSupportRequestService(data);
      if (response.statusCode < 299) {
        getAllTechnicalSupportByUser();
        setDescription("");
        setMessageBackend({
          severityValue: "success",
          detailValue: "Se ha enviado la consulta",
          lifeValue: 3000,
          validateShowMessage: true,
        });
      }
    } catch (error) {
      setMessageBackend({
        severityValue: "error",
        detailValue: "Error al enviar la consulta",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (description.length > 0) {
      setLoading(false);
    }
  }, [description]);

  return (
    <form className="grid text-center" onSubmit={onSubmit}>
      <div className="col-12 md:col-6 sm:col-12">
        <InputText
          className="w-full"
          type="text"
          placeholder="Escriba su consulta"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>
      <div className="col-12 md:col-2 sm:col-12 text-center">
        <Button
          className="text-white"
          label="Enviar"
          type="submit"
          disabled={loading}
        />
      </div>
    </form>
  );
}

export default FormTechnicalSupport;
