import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { ProfileData } from "../../utilities/datosbase";
import { ProfileUserData } from "../../models/enviroment.model";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { FormAccessLogin } from "../Login/models/login.model";
import { useForm } from "react-hook-form";

function Profile(): JSX.Element {
  const idUser = localStorage.getItem("idUser");
  const [userData, setUserData] = useState<ProfileUserData>();
  const [editShape, setEditShape] = useState<boolean>(true);
  const { handleSubmit } = useForm<FormAccessLogin>({ mode: "onChange" });
  useEffect(() => {
    const findUserData = ProfileData.find(
      (user) => user.idUser === Number(idUser)
    );
    console.log("findUserData", findUserData);

    setUserData(findUserData);
  }, []);
  const onSubmit = (data: FormAccessLogin): void => {
    console.log("data", data);
    const findData = ProfileData.findIndex(
      (user) => user.idUser === Number(idUser)
    );
    console.log("findData encontrado", findData);
  };
  return (
    <div className="mt-8">
      <SidebarComponent />
      {userData && (
        <div className="grid text-center">
          <div className="col-12">
            <Avatar icon="pi pi-user" size="xlarge" shape="circle"></Avatar>
            <Badge
              value={`id: ${userData?.idUser}`}
              style={{ right: "5vh" }}
            ></Badge>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="col">
                <label className="ml-3">Nombre: </label>
                <InputText
                  className="p-field"
                  disabled={editShape}
                  value={userData?.name}
                  name="name"
                ></InputText>
              </div>
              <div className="col">
                <label className="ml-3">Apellido: </label>
                <InputText
                  className="p-field"
                  disabled={editShape}
                  value={userData?.lastName}
                  name="lastName"
                ></InputText>
              </div>
              <div className="col-12">
                <label className="ml-3">Correo: </label>
                <InputText
                  className="p-field"
                  disabled
                  value={userData?.email}
                  name="email"
                ></InputText>
              </div>
              <div className="col-12">
                <label className="ml-3">Teléfono: </label>
                <InputText
                  placeholder="Teléfono"
                  disabled={editShape}
                  value={userData?.phone}
                  name="phone"
                ></InputText>
              </div>
              {!editShape && (
                <div className="col-12">
                  <Button
                    label="Guardar"
                    onClick={() => {
                      setEditShape(true);
                    }}
                  />
                </div>
              )}
            </form>
          </div>

          {editShape && (
            <div className="col-12">
              <Button label="Editar" onClick={() => setEditShape(false)} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
