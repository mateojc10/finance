import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { getAllLotteryService } from "../../AdminLottery/services/adminLottery.service";
import { useEffect, useState } from "react";
import {
  AssociateLotteryToUser,
  DropdownField,
} from "../models/adminUsers.model";
import { lotteryActiveDataDropdownAdapter } from "../adapters/adminUser.adapter";
import { Button } from "primereact/button";
import { associateLotteryService } from "../services/adminUser.service";
import { ToastControlBackendModel } from "../../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";

interface Props {
  getAllUsersData: () => void;
  setDialogLotteryToUser: (data: boolean) => void;
  idUser: number;
  setMessageBackend: (value: ToastControlBackendModel) => void;
}
function FormLotteryToUser({
  getAllUsersData,
  setDialogLotteryToUser,
  idUser,
  setMessageBackend,
}: Props): JSX.Element {
  const [lotteryData, setLotteryData] = useState<DropdownField[]>([]);
  const [lottery, setLottery] = useState<string>();
  const [loading, setLoading] = useState(true);
  const getAllLotteryActive = async () => {
    try {
      const getAllLottery = await getAllLotteryService();
      if (getAllLottery.length > 0) {
        setLotteryData(lotteryActiveDataDropdownAdapter(getAllLottery));
      }
    } catch (error) {
      setMessageBackend({
        detailValue: "Ocurrio un error al obtener los sorteos activos",
        severityValue: "error",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    }
  };

  useEffect(() => {
    getAllLotteryActive();
  }, []);
  useEffect(() => {
    if (lottery) {
      setLoading(false);
    }
  }, [lottery]);
  const onSubmit = async () => {
    setLoading(true);
    try {
      if (lottery) {
        const dataForUpdate: AssociateLotteryToUser = {
          idLottery: +lottery,
          idUser: +idUser,
        };
        const response = await associateLotteryService(dataForUpdate);
        if (response) {
          getAllUsersData();
          setDialogLotteryToUser(false);
          setMessageBackend({
            detailValue: "Sorteo asociado con exito",
            severityValue: "success",
            lifeValue: 3000,
            validateShowMessage: true,
          });
        }
      }
    } catch (error) {
      setMessageBackend({
        detailValue: "Ocurrio un error al asociar el sorteo",
        severityValue: "error",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form className="grid text-center" onSubmit={onSubmit}>
        <div className="col-12 md:col-8 sm:col-12 mt-4">
          <Dropdown
            filter
            className="w-full"
            placeholder="Elije un sorteo"
            value={lottery}
            options={lotteryData}
            optionLabel="name"
            onChange={(e: DropdownChangeEvent) => setLottery(e.target.value)}
            optionValue="code"
          />
        </div>
        <div className="col-12 md:col-4 sm:col-12">
          <Button
            className="mt-4 text-white"
            label="Registrar"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
}

export default FormLotteryToUser;
