import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { ToastControlBackendModel } from "./models/toastBackControl.model";

function ToastBackControl({
  detailValue,
  lifeValue,
  severityValue,
  validateShowMessage,
}: ToastControlBackendModel): JSX.Element {
  const toast = useRef<Toast>(null);
  const showMessage = () => {
    toast.current?.show({
      severity: severityValue,
      summary: severityValue,
      detail: detailValue,
      life: lifeValue,
    });
  };
  useEffect(() => {
    showMessage();
  }, [validateShowMessage]);

  return (
    <>
      <div className="card flex justify-content-center">
        <Toast ref={toast} />
      </div>
    </>
  );
}

export default ToastBackControl;
