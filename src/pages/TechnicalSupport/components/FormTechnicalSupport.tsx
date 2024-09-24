import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";
import { createThecnicalSupportRequestService } from "../services/technicalSupport.services";
interface Props {
  idUser: number;
  getAllTechnicalSupportByUser: () => void;
}
function FormTechnicalSupport({
  idUser,
  getAllTechnicalSupportByUser,
}: Props): JSX.Element {
  const [description, setDescription] = useState<string>("");
  const onSubmit = async () => {
    try {
      const data = {
        idUser: Number(idUser),
        description: description,
      };
      const response = await createThecnicalSupportRequestService(data);
      if (response.statusCode < 299) {
        getAllTechnicalSupportByUser();
        setDescription("");
      } else {
      }
    } catch (error) {}
  };
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
          label="Enviar"
          type="submit"
          disabled={description.length < 3}
        />
      </div>
    </form>
  );
}

export default FormTechnicalSupport;
