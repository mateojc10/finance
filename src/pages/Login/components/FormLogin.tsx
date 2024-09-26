import { SubmitHandler, useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { storeData } from "../../../utilities/localStorage";
import { AuthAccessLogin, FormAccessLogin } from "../models/login.model";
import { useNavigate } from "react-router-dom";
import { authValidateService } from "../services/login.service";

function FormLogin(): JSX.Element {
  const [valuePassword, setValuePassword] = useState<string>("");
  const [valueUser, setValueUser] = useState<string>("");
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [validateAccess, setValidateAccess] = useState<boolean>(false);
  const { handleSubmit } = useForm<FormAccessLogin>({ mode: "onChange" });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormAccessLogin> = async () => {
    try {
      const data: AuthAccessLogin = {
        user: valueUser,
        password: valuePassword,
      };
      const response = await authValidateService(data);

      if (response.data) {
        storeData("idUser", response.data?.idUser);
        storeData("role", response.data?.role);
        storeData("isAdmin", response.data?.role === "admin" ? 1 : 0);
        storeData("activeSession", true);
        setValidateAccess(false);
        setValuePassword("");
        setValueUser("");
        if (response.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/inicio");
        }
      } else {
        setValidateAccess(true);
      }
    } catch (error) {
      setValidateAccess(true);
    }
  };
  useEffect(() => {
    setActiveButton(valuePassword && valueUser ? true : false);
  }, [valuePassword, valueUser]);
  return (
    <form className="col-12 formgroup m-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="m-4 p-fluid">
        <FloatLabel>
          <InputText
            autoFocus
            name="username"
            id="username"
            value={valueUser}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValueUser(e.target.value)
            }
          />
          <label htmlFor="username">Usuario</label>
        </FloatLabel>
      </div>
      <div className="m-4 p-fluid">
        <FloatLabel>
          <Password
            name="password"
            toggleMask
            feedback={false}
            inputId="password"
            value={valuePassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValuePassword(e.target.value)
            }
          />
          <label htmlFor="password">Contraseña:</label>
        </FloatLabel>
        {validateAccess && (
          <p className="p-error">Usuario o contraseña incorrecto</p>
        )}
      </div>
      <div className=" m-4 text-center">
        <Button type="submit" label="ingresar" disabled={!activeButton} />
      </div>
    </form>
  );
}

export default FormLogin;
