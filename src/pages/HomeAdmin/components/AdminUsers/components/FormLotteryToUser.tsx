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

interface Props {
  getAllUsersData: () => void;
  setDialogLotteryToUser: (data: boolean) => void;
  idUser: number;
}
function FormLotteryToUser({
  getAllUsersData,
  setDialogLotteryToUser,
  idUser,
}: Props): JSX.Element {
  const [lotteryData, setLotteryData] = useState<DropdownField[]>([]);
  const [lottery, setLottery] = useState<string>();
  const getAllLotteryActive = async () => {
    try {
      const getAllLottery = await getAllLotteryService();
      if (getAllLottery.length > 0) {
        setLotteryData(lotteryActiveDataDropdownAdapter(getAllLottery));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllLotteryActive();
  }, []);
  const onSubmit = async () => {
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
        }
      }
    } catch (error) {}
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
            label="Crear Sorteo"
            disabled={lottery ? false : true}
          />
        </div>
      </form>
    </div>
  );
}

export default FormLotteryToUser;
