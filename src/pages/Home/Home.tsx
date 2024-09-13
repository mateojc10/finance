import { Button } from "primereact/button";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { Card } from "primereact/card";
import { useEffect, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import StaticsData from "./components/StaticsData";
import { Toast } from "primereact/toast";
function Home(): JSX.Element {
  const toast = useRef<Toast>(null);

  const accept = () => {
    toast.current?.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current?.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const requestSaves = (): void => {
    confirmDialog({
      message: "¿Seguro que desea solicitar el retiro?",
      header: "Confirmar solicitud de retiro",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "aceptar",
      accept,
      reject,
      acceptLabel: "SI",
      rejectLabel: "NO",
    });
  };
  const footer = (
    <>
      <Button
        label="Solicitar retiro"
        icon="pi pi-check"
        onClick={requestSaves}
      />
    </>
  );
  return (
    <div className="m-8">
      <div className="col-12 text-center mb-4">
        <h2>Bienvenido a Bifinancing</h2>
      </div>
      <SidebarComponent />
      <div className="card flex justify-content-center ml-2">
        <div className="col-6">
          <Toast ref={toast} />
          <ConfirmDialog />
          <Card
            title="Solicitud de retiro"
            subTitle="genera la solicitud de retiro de saldo"
            footer={footer}
            className="md:w-25rem"
          >
            <p className="m-0">
              Puedes realizar tu solicitud de retiro dando clic en el botón
              <strong> solicitar retiro</strong>, recuerda que el contacto se
              realizará los 5 días hábiles después de la solicitud
            </p>
          </Card>
        </div>
        <div className="col-4">
          <h4>Evolución de sorteos</h4>
          <StaticsData />
        </div>
      </div>
    </div>
  );
}

export default Home;
