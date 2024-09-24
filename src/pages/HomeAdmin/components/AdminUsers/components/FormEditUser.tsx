import { useState } from "react";
import { EditUserAdminForm, ProfileUserData } from "../models/adminUsers.model";
import { Button } from "primereact/button";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { roles } from "../../../../../utilities/dropdownDataBase";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { editUserAdminService } from "../services/adminUser.service";
interface Props {
  getAllUsersData: () => void;
  setDialogEditUser: (data: boolean) => void;
  dataUser: ProfileUserData;
}
function FormEditUser({
  getAllUsersData,
  setDialogEditUser,
  dataUser,
}: Props): JSX.Element {
  const [user, setUser] = useState<string>(dataUser.user);
  const [name, setName] = useState<string>(dataUser.name);
  const [lastName, setLastName] = useState<string>(dataUser.lastName);
  const [phone, setPhone] = useState<string>(dataUser.phone);
  const [role, setRole] = useState<string>(dataUser.role);
  const [state, setState] = useState<boolean>(dataUser.state);
  const onSubmit = async () => {
    try {
      const data: EditUserAdminForm = {
        idUser: dataUser.idUser,
        user,
        name,
        lastName,
        phone,
        role,
        state,
      };

      const response = await editUserAdminService(data);
      if (response) {
        getAllUsersData();
        setDialogEditUser(false);
      }
    } catch (error) {}
  };
  return (
    <div>
      <form className="grid text-center mr-8" onSubmit={onSubmit}>
        <div className="col-12 md:col-6 sm:col-12">
          <InputText
            autoFocus
            maxLength={100}
            minLength={2}
            className="w-full"
            type="text"
            placeholder="Usuario"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUser(e.target.value)
            }
            value={user}
          />
        </div>
        <div className="col-12 md:col-6 sm:col-12">
          <InputText
            maxLength={100}
            minLength={2}
            className="w-full"
            type="text"
            placeholder="Nombre"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
          />
        </div>
        <div className="col-12 md:col-6 sm:col-12">
          <InputText
            maxLength={100}
            minLength={2}
            className="w-full"
            type="text"
            placeholder="Apellido"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLastName(e.target.value)
            }
            value={lastName}
          />
        </div>
        <div className="col-12 md:col-6 sm:col-12">
          <InputText
            maxLength={20}
            minLength={2}
            className="w-full"
            type="text"
            placeholder="Teléfono"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhone(e.target.value)
            }
            value={phone}
          />
        </div>
        <div className="col-12 md:col-6 sm:col-12">
          <Dropdown
            className="w-full"
            type="text"
            placeholder="Elije el rol"
            value={role}
            options={roles}
            optionLabel="name"
            onChange={(e: DropdownChangeEvent) => setRole(e.target.value)}
            optionValue="code"
          />
        </div>
        <div className="col-12 md:col-6 sm:col-12">
          <label
            className={`text-white text-xl mr-2 pr-2 ${
              state ? "bg-green-500 border-circle" : "bg-red-500 border-circle"
            }`}
          >
            {state ? "Activo" : "Inactivo"}
          </label>
          <InputSwitch checked={state} onChange={(e) => setState(e.value)} />
        </div>
        <div className="col-12 md:col-6 sm:col-12 ">
          <Button className="text-center text-white" label="Editar usuario" />
        </div>
      </form>
    </div>
  );
}

export default FormEditUser;
