import { InputText } from "primereact/inputtext";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { Button } from "primereact/button";

function TechnicalSupport(): JSX.Element {
  return (
    <div className="mt-8">
      <h2 className="text-center mb-8">Solicitar asistencia técnica</h2>
      <SidebarComponent />
      <form className="grid text-center">
        <div className="col-12">
          <label className="m-3" htmlFor="details">
            Solicitud:
          </label>
          <InputText
            id="details"
            className="p-fluid"
            placeholder="Detalles de la solicitud"
            autoFocus
          ></InputText>
        </div>
        <div className="col-12">
          <Button label="Enviar solicitud" />
        </div>
      </form>
      <p className="text-center mt-8">
        <strong>IMPORTANTE: </strong>
        <ul className="text-center">
          <li className="mt-2">* El tiempo de respuesta es de 48 horas</li>
          <li className="mt-2">* Se le notificara vía correo electrónico</li>
          <li className="mt-2">
            * El usuario es responsable de la verificación de la información
          </li>
        </ul>
      </p>
    </div>
  );
}

export default TechnicalSupport;
