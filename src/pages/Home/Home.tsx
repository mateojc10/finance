import { Button } from "primereact/button";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { Card } from "primereact/card";
import { useEffect } from "react";
// import { imageStatics } from "../../assets/img/imagenTarjetaSolicitudRetiro.png";
function Home(): JSX.Element {
  const header = (
    <img
      alt="Card"
      src="https://www.fundelt.com/excelencia-liderazgo-transformacion/wp-content/uploads/2022/11/Fundelt-134-Estadisticas.png"
    />
  );
  const footer = (
    <>
      <Button label="Solicitar retiro" icon="pi pi-check" />
    </>
  );
  return (
    <div>
      <SidebarComponent />
      <div className="card flex justify-content-center">
        <Card
          title="Solicitud de retiro"
          subTitle="genera la solicitud de retiro de saldo"
          footer={footer}
          header={header}
          className="md:w-25rem"
        >
          <p className="m-0">
            Puedes realizar tu solicitud de retiro dando clic en el botón
            solicitud, recuerda que el contacto se realizará los 5 días hábiles
            a la solicitud
          </p>
        </Card>
      </div>
    </div>
  );
}

export default Home;
