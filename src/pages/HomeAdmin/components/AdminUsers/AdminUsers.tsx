import { useEffect, useState } from "react";
import TabMenuAdmin from "../TabMenuAdmin/TabMenuAdmin";
import { ProfileUserData } from "./models/adminUsers.model";
import { getAllUsersService } from "./services/adminUser.service";
import TableUsers from "./components/TableUsers";
import FormCreateUser from "./components/FormCreateUser";
import { Dialog } from "primereact/dialog";
import FormEditUser from "./components/FormEditUser";
import { userDataAdapter } from "./adapters/adminUser.adapter";
import FormChangePassword from "./components/FormChangePassword";
import FormLotteryToUser from "./components/FormLotteryToUser";
import TableLotteryToUser from "./components/TableLotteryToUser";
import { getDataUserByIdservice } from "../../../Profile/services/profile.service";
import { ApiLotteryData } from "../AdminLottery/model/adminLottery.model";
import { useNavigate } from "react-router-dom";
import ToastBackControl from "../../../../components/Sidebar/ToastBackControl/ToastBackControl";
import { ToastControlBackendModel } from "../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";

function AdminUsers(): JSX.Element {
  const isAdminValue = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const [userData, setUserData] = useState<ProfileUserData[]>([]);
  const [dataUser, setDataUser] = useState<ProfileUserData>();
  const [dialogEditUser, setDialogEditUser] = useState<boolean>(false);
  const [dialogChangePasswordUser, setDialogChangePasswordUser] =
    useState<boolean>(false);
  const [dialogLotteryToUser, setDialogLotteryToUser] =
    useState<boolean>(false);

  const [dataLotteryForUser, setDataLotteryForUser] = useState<
    ApiLotteryData[]
  >([]);

  const [messageBackend, setMessageBackend] =
    useState<ToastControlBackendModel>({
      severityValue: "info",
      detailValue: "",
      lifeValue: 3000,
      validateShowMessage: false,
    });
  const getAllUsersData = async () => {
    try {
      const response = await getAllUsersService();
      if (response.length > 0) {
        setUserData(userDataAdapter(response));
      }
    } catch (error) {}
  };
  const findLotteryByUser = async (idUser: number) => {
    try {
      const response = await getDataUserByIdservice(idUser);
      const { lottery } = response.data;
      if (lottery.length === 0) {
        setDataLotteryForUser([]);
      } else {
        setDataLotteryForUser(lottery);
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (isAdminValue !== "1") {
      navigate("/");
    }
    getAllUsersData();
  }, []);

  return (
    <>
      {messageBackend.validateShowMessage && (
        <ToastBackControl
          validateShowMessage={messageBackend.validateShowMessage}
          detailValue={messageBackend.detailValue}
          lifeValue={messageBackend.lifeValue}
          severityValue={messageBackend.severityValue}
        />
      )}
      <TabMenuAdmin />
      <div className="grid">
        <div className="col-12 md:col-12 sm:col-12 text-center">
          <h2>Administración de usuarios</h2>
        </div>

        <div className="col-12 md:col-12 sm:col-12 m-4">
          <h3>Crear nuevo usuario </h3>
          <FormCreateUser
            getAllUsersData={getAllUsersData}
            setMessageBackend={setMessageBackend}
          />
        </div>

        <div className="col-12 md:col-12 sm:col-12 m-4">
          <TableUsers
            setDialogChangePasswordUser={setDialogChangePasswordUser}
            userData={userData}
            setDataUser={setDataUser}
            setDialogEditUser={setDialogEditUser}
            setDialogLotteryToUser={setDialogLotteryToUser}
            findLotteryByUser={findLotteryByUser}
          />
        </div>
        {dataUser && (
          <>
            <Dialog
              header="Editar usuario"
              visible={dialogEditUser}
              onHide={() => setDialogEditUser(false)}
            >
              <FormEditUser
                dataUser={dataUser}
                getAllUsersData={getAllUsersData}
                setDialogEditUser={setDialogEditUser}
                key="edit-user"
                setMessageBackend={setMessageBackend}
              />
            </Dialog>
            <Dialog
              header={`Cambio contraseña ${dataUser.name} ${dataUser.lastName}`}
              visible={dialogChangePasswordUser}
              onHide={() => setDialogChangePasswordUser(false)}
            >
              <FormChangePassword
                dataUser={dataUser}
                getAllUsersData={getAllUsersData}
                setDialogChangePasswordUser={setDialogChangePasswordUser}
                key="change-password-user"
                setMessageBackend={setMessageBackend}
              />
            </Dialog>

            <Dialog
              header={`Agregar sorteo al usuario:  ${dataUser.name} ${dataUser.lastName}`}
              visible={dialogLotteryToUser}
              onHide={() => setDialogLotteryToUser(false)}
            >
              <>
                <FormLotteryToUser
                  getAllUsersData={getAllUsersData}
                  setDialogLotteryToUser={setDialogLotteryToUser}
                  idUser={dataUser.idUser}
                  key="register-lottery"
                  setMessageBackend={setMessageBackend}
                />
                {dataLotteryForUser.length > 0 ? (
                  <>
                    <h2 className="m-4 text-center">Sorteos asociados</h2>
                    <TableLotteryToUser
                      dataLotteryForUser={dataLotteryForUser}
                    />
                  </>
                ) : (
                  <h2 className="p-error text-center">
                    No tiene sorteos asociados
                  </h2>
                )}
              </>
            </Dialog>
          </>
        )}
      </div>
    </>
  );
}

export default AdminUsers;
