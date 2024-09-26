import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { InputText } from "primereact/inputtext";
import { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";
import { createLotteryService } from "../services/adminLottery.service";
import { CreateLotteryForm } from "../model/adminLottery.model";

interface Props {
  getAllLotteryData: () => void;
}
function FormCreateLottery({ getAllLotteryData }: Props): JSX.Element {
  const [descriptionLottery, setDescriptionLottery] = useState<string>("");
  const [rewardLottery, setRewardLottery] = useState<number>(0);
  const [dateEndLottery, setDateEndLottery] = useState<Nullable<Date>>(null);
  const [validateForm, setValidateForm] = useState(false);

  const onSubmit = async () => {
    try {
      const data: CreateLotteryForm = {
        descriptionLottery,
        rewardLottery,
        dateEndLottery: dateEndLottery
          ? dateEndLottery.toISOString().split("T")[0]
          : null,
      };
      const response = await createLotteryService(data);
      if (response.statusCode < 299) {
        getAllLotteryData();
      }
    } catch (error) {}
  };
  useEffect(() => {
    if (
      descriptionLottery !== "" &&
      rewardLottery !== 0 &&
      dateEndLottery !== null
    ) {
      setValidateForm(true);
    }
  }, [descriptionLottery, rewardLottery, dateEndLottery, validateForm]);
  return (
    <div>
      <form className="grid text-center mr-8">
        <div className="field col-12 md:col-3">
          <InputText
            autoFocus
            className="w-full"
            type="text"
            placeholder="Descripción del sorteo"
            id="descriptionLottery"
            onChange={(e) => setDescriptionLottery(e.target.value)}
          />
        </div>
        <div className="field col-12 md:col-3">
          <InputText
            className="w-full"
            type="number"
            maxLength={10}
            id="rewardLottery"
            placeholder="Ganancía"
            onChange={(e) => setRewardLottery(Number(e.target.value))}
          />
        </div>
        <div className="field col-12 md:col-3">
          <Calendar
            id="dateEndLottery"
            value={dateEndLottery}
            onChange={(e) => setDateEndLottery(e.value)}
            dateFormat="yy/mm/dd"
            placeholder="Fecha de sorteo"
            className="w-full"
            showIcon
            touchUI
          />
        </div>
        <div className="col-12 md:col-3">
          <Button
            label="Crear"
            onClick={() => onSubmit()}
            disabled={!validateForm}
          />
        </div>
      </form>
    </div>
  );
}

export default FormCreateLottery;
