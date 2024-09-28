import { Nullable } from "primereact/ts-helpers";
import { useEffect, useState } from "react";
import { ApiLotteryData, UpdateLotteryForm } from "../model/adminLottery.model";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { updateLotteryService } from "../services/adminLottery.service";
import { InputText } from "primereact/inputtext";
import { InputSwitch } from "primereact/inputswitch";
import { ToastControlBackendModel } from "../../../../../components/Sidebar/ToastBackControl/models/toastBackControl.model";
interface Props {
  getAllLotteryData: () => void;
  setDialogEditLottery: (data: boolean) => void;
  dataLottery: ApiLotteryData;
  setMessageBackend: (value: ToastControlBackendModel) => void;
}
function FormEditLottery({
  getAllLotteryData,
  setDialogEditLottery,
  dataLottery,
  setMessageBackend,
}: Props): JSX.Element {
  const dateDb = new Date(dataLottery.dateLottery);
  const [descriptionLottery, setDescriptionLottery] = useState<string>(
    dataLottery.descriptionLottery
  );
  const [rewardLottery, setRewardLottery] = useState<number>(
    dataLottery.rewardLottery
  );
  const [dateEndLottery, setDateEndLottery] = useState<Nullable<Date>>(dateDb);
  const [validateForm, setValidateForm] = useState(false);
  const [stateLottery, setStateLottery] = useState<boolean>(
    dataLottery.stateLottery
  );
  const [numberLottery, setNumberLottery] = useState<number | null>(
    dataLottery.numberLottery
  );
  const onSubmit = async () => {
    setValidateForm(false);
    try {
      const data: UpdateLotteryForm = {
        descriptionLottery,
        rewardLottery,
        dateEndLottery: dateEndLottery
          ? dateEndLottery.toISOString().split("T")[0]
          : null,
        stateLottery,
        idLottery: dataLottery.idLottery,
        numberLottery: numberLottery ? numberLottery : null,
      };
      const response = await updateLotteryService(data);
      if (response.statusCode < 299) {
        getAllLotteryData();
        setDialogEditLottery(false);
        setMessageBackend({
          detailValue: "Sorteo editado con exito",
          severityValue: "success",
          lifeValue: 3000,
          validateShowMessage: true,
        });
      }
    } catch (error) {
      setMessageBackend({
        detailValue: "Error al editar el sorteo",
        severityValue: "error",
        lifeValue: 3000,
        validateShowMessage: true,
      });
    } finally {
      setValidateForm(true);
    }
  };

  useEffect(() => {
    if (
      descriptionLottery !== "" &&
      rewardLottery !== 0 &&
      dateEndLottery !== null
    ) {
      setValidateForm(true);
    }
  }, [descriptionLottery, rewardLottery, dateEndLottery]);

  return (
    <div>
      <form className="grid text-center m-8">
        <div className="field col-12 md:col-3">
          <InputText
            value={descriptionLottery}
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
            value={String(numberLottery)}
            autoFocus
            className="w-full"
            type="number"
            placeholder="Número ganador"
            id="numberLottery"
            onChange={(e) => setNumberLottery(+e.target.value)}
          />
        </div>
        <div className="field col-12 md:col-3">
          <InputText
            value={String(rewardLottery)}
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
        <div className="col-12 md:col-3 sm:col-12">
          <label
            className={`text-white text-xl mr-2 pr-2 ${
              stateLottery
                ? "bg-green-500 border-circle"
                : "bg-red-500 border-circle"
            }`}
          >
            {stateLottery ? "Activo" : "Inactivo"}
          </label>
          <InputSwitch
            checked={stateLottery}
            onChange={(e) => setStateLottery(e.value)}
          />
        </div>
        <div className="col-12 md:col-3">
          <Button label="Editar" disabled={!validateForm} onClick={onSubmit} />
        </div>
      </form>
    </div>
  );
}

export default FormEditLottery;
