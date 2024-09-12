import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { Avatar } from "primereact/avatar";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { ProfileData } from "../../utilities/datosbase";
import { ProfileUserData } from "../../models/enviroment.model";
import { Button } from "primereact/button";

function Profile(): JSX.Element {
  const idUser = localStorage.getItem("idUser");
  const [userData, setUserData] = useState<ProfileUserData>();
  const [editShape, setEditShape] = useState<boolean>(true);
  useEffect(() => {
    const findUserData = ProfileData.find(
      (user) => user.idUser === Number(idUser)
    );
    console.log("findUserData", findUserData);

    setUserData(findUserData);
  }, []);
  return (
    <>
      <SidebarComponent />
      {userData && (
        <div className="grid text-center">
          <div className="col-12">
            <Avatar icon="pi pi-user" size="xlarge" shape="circle" />
            <div className="col">
              <label className="ml-3">Nombre: </label>
              <InputText
                className="p-field"
                disabled={editShape}
                value={userData?.name}
              ></InputText>
            </div>
            <div className="col">
              <label className="ml-3">Apellido: </label>
              <InputText
                className="p-field"
                disabled={editShape}
                value={userData?.lastName}
              ></InputText>
            </div>
          </div>
          <div className="col-12">
            <label className="ml-3">Correo: </label>
            <InputText
              className="p-field"
              disabled
              value={userData?.email}
            ></InputText>
          </div>
          <div className="col-12">
            <label className="ml-3">Contraseña: </label>
            <InputText
              className="p-field"
              disabled={editShape}
              value={userData?.password}
            ></InputText>
          </div>

          <div className="col-12">
            <label className="ml-3">Teléfono: </label>
            <InputText
              placeholder="Teléfono"
              disabled={editShape}
              value={userData?.phone}
            ></InputText>
          </div>
          {editShape && (
            <div className="col-12">
              <Button label="Editar" onClick={() => setEditShape(false)} />
            </div>
          )}
          {!editShape && (
            <div className="col-12">
              <Button label="Guardar" onClick={() => setEditShape(true)} />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Profile;
