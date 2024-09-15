import { InputText } from "primereact/inputtext";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { Button } from "primereact/button";
import { Card } from "primereact/card";

function TechnicalSupport(): JSX.Element {
  const footer = (
    <>
      <Button
        label="Contactanos"
        icon="pi pi-whatsapp"
        onClick={() => {
          window.open("https://wa.me/+573043286916", "_blank");
        }}
        severity="success"
      />
    </>
  );
  return (
    <div className="grid">
      <SidebarComponent />
      <div className="col mt-8 p-8 col-offset-3">
        <Card
          title="Contactenos vía Whatsapp"
          subTitle="Encuentra ayuda vía Whatsapp"
          footer={footer}
          className="md:w-25rem"
        >
          <p className="m-0">
            Dando clic en el botón
            <strong> Contactanos</strong> y en breve uno de nuestros agentes se
            pondra en contacto con usted.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default TechnicalSupport;
