import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { RegisterWithdrawalRequest } from "../Transfer/models/transfer.model";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import {
  validateActiveRequestService,
  withdrawalRegisterRequestService,
} from "./services/home.service";
import { getDataUserByIdService } from "../Profile/services/profile.service";
import { Card } from "primereact/card";
import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import StaticsData from "./components/StaticsData";
import logoBifinancing from "../../assets/img/logo-bifinancing.jpeg";
import { Image } from "primereact/image";

function Home(): JSX.Element {
  const activeSession = localStorage.getItem("activeSession");
  const idUser = localStorage.getItem("idUser");
  const toast = useRef<Toast>(null);
  const [idLottery, setIdLottery] = useState<number>(0);

  const [descriptionLottery, setDescriptionLottery] = useState<string | null>(
    ""
  );
  const [validateRequestPending, setValidateRequestPending] =
    useState<boolean>(false);
  const [balanceProfileUser, setBalanceProfileUser] = useState<number>(0);
  const accept = () => {
    const dataForRegisterRequest: RegisterWithdrawalRequest = {
      idUser: idUser ? +idUser : 0,
      idLottery: +idLottery,
    };
    registerWithdrawalRequest(dataForRegisterRequest);
    findDataUser();
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
      {idLottery ? (
        <Button
          label="Solicitar retiro"
          icon="pi pi-check"
          onClick={requestSaves}
        />
      ) : null}
    </>
  );
  const getActiveRequest = async (): Promise<void> => {
    try {
      if (idUser) {
        const response = await validateActiveRequestService(+idUser);

        if (response.length > 0) {
          const validateResponseEmpty = response.filter(
            (item) => item.responseWithdrawalRequest === null
          );
          setValidateRequestPending(
            validateResponseEmpty.length > 0 ? true : false
          );
        }
      } else {
        window.location.href = "/";
      }
    } catch (error) {}
  };
  const findDataUser = async (): Promise<void> => {
    try {
      if (idUser) {
        const response = await getDataUserByIdService(+idUser);
        setBalanceProfileUser(response?.data?.balance);

        if (response?.data) {
          setIdLottery(response.data.lottery[0].idLottery);
          setDescriptionLottery(response.data.lottery[0].descriptionLottery);
        }
      } else {
        window.location.href = "/";
      }
    } catch (error) {}
  };

  const registerWithdrawalRequest = async (
    data: RegisterWithdrawalRequest
  ): Promise<void> => {
    try {
      if (idUser) {
        const response = await withdrawalRegisterRequestService(data);
        if (response.statusCode < 299) {
          getActiveRequest();
        }
      } else {
        window.location.href = "/";
      }
    } catch (error) {}
  };

  useEffect(() => {
    findDataUser();
    getActiveRequest();
    if (activeSession === "false") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="m-8 grid">
      <div className="col-12 text-center mb-4">
        <div className="col-12 md:col-12 sm:col-12">
          <div className="grid">
            <div className="col">
              <h2>Bienvenido a Bifinancing</h2>
              <h2 className="text-xl text-center col-12 md:col-12 sm:col-12 text-yellow-500">
              Saldo: {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              }).format(balanceProfileUser)} COP
            </h2>
            </div>
            <div className="col-12 md:col-4 sm:col-12 mr-4">
              <div className="card flex justify-content-center">
                <Image
                  src={logoBifinancing}
                  alt="Logo bifinancing"
                  width="250"
                />
              </div>
            </div>
          </div>
        </div>
        <>
          {validateRequestPending ? (
            <h3 className="bg-green-800 p-3">
              Tiene una solicitud de retiro pendiente
            </h3>
          ) : (
            <div className="grid">
              <div className="card flex justify-content-center md:col-4 sm:col-12">
                <div className="col-12 md:col-6 sm:col-12">
                  <Toast ref={toast} />
                  <ConfirmDialog />

                  <Card
                    title="Solicitud de retiro"
                    subTitle="genera la solicitud de retiro de saldo"
                    footer={footer}
                    className="md:w-25rem"
                  >
                    <p className="m-3">
                      Puedes realizar tu solicitud de retiro para el{" "}
                      <strong className="text-primary">
                        {descriptionLottery}
                      </strong>{" "}
                      dando clic en el botón
                      <strong> solicitar retiro</strong>, recuerda que el
                      contacto se realizará los 5 días hábiles después de la
                      solicitud
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          )}
        </>
      </div>
      <SidebarComponent />
      <div className="col-12 text-center md:col-8 sm:col-12">
        <h4>Evolución de sorteos</h4>
        <StaticsData />
      </div>
    </div>
  );
}

export default Home;
