import { useEffect, useState } from "react";
import { CreateUserForm } from "../models/adminUsers.model";
import { InputText } from "primereact/inputtext";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { Button } from "primereact/button";
import { createUserService } from "../services/adminUser.service";
import { roles } from "../../../../../utilities/dropdownDataBase";
interface Props {
  getAllUsersData: () => void;
}
function FormCreateUser({ getAllUsersData }: Props): JSX.Element {
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (user && password && name && lastName && phone && role) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [role, user, password, name, lastName, phone]);
  const onSubmit = async () => {
    try {
      const data: CreateUserForm = {
        user,
        password,
        name,
        lastName,
        phone,
        role,
        balance,
      };
      const response = await createUserService(data);
      if (response.statusCode < 299) {
        getAllUsersData();
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
          />
        </div>
        <div className="col-12 md:col-6 sm:col-12">
          <InputText
            maxLength={100}
            minLength={2}
            className="w-full"
            type="text"
            placeholder="Contraseña"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
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
          <InputText
            type="number"
            className="w-full"
            placeholder="Saldo"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setBalance(Number(e.target.value))
            }
          ></InputText>
        </div>

        <div className="col-12 md:col-6 sm:col-12 ">
          <Button
            className="text-center text-white"
            disabled={disabledButton}
            label="Crear usuario"
          />
        </div>
      </form>
    </div>
  );
}

export default FormCreateUser;
