import {
  ChangePasswordUser,
  ProfileUserData,
} from "../models/adminUsers.model";
import { useEffect, useState } from "react";
import { changePasswordService } from "../services/adminUser.service";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { ToastControlBackendModel } from "../../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";

interface Props {
  getAllUsersData: () => void;
  setDialogChangePasswordUser: (data: boolean) => void;
  dataUser: ProfileUserData;
  setMessageBackend: (value: ToastControlBackendModel) => void;
}
function FormChangePassword({
  getAllUsersData,
  setDialogChangePasswordUser,
  dataUser,
  setMessageBackend,
}: Props): JSX.Element {
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setConfirmPassword] = useState<string>("");
  const [validatePassword, setValidatePassword] = useState<boolean>(true);
  const onSubmit = async () => {
    setValidatePassword(true);
    try {
      const data: ChangePasswordUser = {
        idUser: dataUser.idUser,
        password,
      };
      const response = await changePasswordService(data);
      if (response) {
        getAllUsersData();
        setDialogChangePasswordUser(false);
        setMessageBackend({
          detailValue: "Contraseña cambiada con exito",
          severityValue: "success",
          lifeValue: 3000,
          validateShowMessage: true,
        });
      }
    } catch (error) {
      setMessageBackend({
        detailValue: "Ocurrio un error al cambiar la contraseña",
        severityValue: "error",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    } finally {
      setValidatePassword(false);
    }
  };
  useEffect(() => {
    if (password && passwordConfirm) {
      if (password === passwordConfirm) {
        setValidatePassword(false);
      } else {
        setValidatePassword(true);
      }
    }
  }, [password, passwordConfirm]);
  return (
    <div>
      <form className="grid text-center mr-8" onSubmit={onSubmit}>
        <div className="col-12 md:col-4 sm:col-12 ml-4">
          <Password
            autoFocus
            className="w-full"
            type="password"
            placeholder="Contraseña"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            feedback={false}
            id="password"
            toggleMask
          />
        </div>
        <div className="col-12 md:col-4 sm:col-12 ml-4">
          <Password
            className="w-full"
            type="password"
            placeholder="Confirmar contraseña"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
            }
            feedback={false}
            id="password"
            toggleMask
          />
          <span className="p-error text-xl">
            {password.length > 0 &&
            passwordConfirm.length > 0 &&
            validatePassword
              ? "Las contraseñas no coinciden"
              : ""}
          </span>
        </div>
        <div className="col-12 md:col-2 sm:col-12 ml-4">
          <Button
            label="Cambiar"
            className="p-fluid text-white"
            disabled={validatePassword}
          />
        </div>
      </form>
    </div>
  );
}

export default FormChangePassword;
