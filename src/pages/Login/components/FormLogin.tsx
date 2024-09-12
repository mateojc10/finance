import { SubmitHandler, useForm } from "react-hook-form";
import { Password } from "primereact/password";
import { FloatLabel } from "primereact/floatlabel";
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { loginData, ProfileData } from "../../../utilities/datosbase";
import { storeData } from "../../../utilities/localStorage";
import { FormAccessLogin } from "../models/login.model";
import { useNavigate } from "react-router-dom";

function FormLogin(): JSX.Element {
  const [valuePassword, setValuePassword] = useState<string>("");
  const [valueUser, setValueUser] = useState<string>("");
  const [activeButton, setActiveButton] = useState<boolean>(false);
  const [validateAccess, setValidateAccess] = useState<boolean>(false);
  const { handleSubmit } = useForm<FormAccessLogin>({ mode: "onChange" });

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<FormAccessLogin> = async (
    data: FormAccessLogin
  ) => {
    const validateAccess = loginData.find(
      (user) => user.userName === valueUser && user.password === valuePassword
    );

    if (validateAccess) {
      const findProfileData = ProfileData.find(
        (user) => user.idUser === validateAccess.idUser
      );
      console.log("findProfileData", typeof findProfileData);
      storeData("idUser", findProfileData?.idUser);
      storeData("role", findProfileData?.role);
      setValidateAccess(false);
      setValuePassword("");
      setValueUser("");
      navigate("/inicio");
    } else {
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
        <Button
          className=""
          type="submit"
          label="ingresar"
          disabled={!activeButton}
        />
      </div>
    </form>
  );
}

export default FormLogin;
