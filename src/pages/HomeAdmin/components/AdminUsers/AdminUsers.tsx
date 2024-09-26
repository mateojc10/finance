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
      <TabMenuAdmin />
      <div className="grid">
        <div className="col-12 md:col-12 sm:col-12 text-center">
          <h2>Administración de usuarios</h2>
        </div>

        <div className="col-12 md:col-12 sm:col-12 m-4">
          <h3>Crear nuevo usuario </h3>
          <FormCreateUser getAllUsersData={getAllUsersData} />
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
                />
                {dataLotteryForUser.length > 0 && (
                  <TableLotteryToUser dataLotteryForUser={dataLotteryForUser} />
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
