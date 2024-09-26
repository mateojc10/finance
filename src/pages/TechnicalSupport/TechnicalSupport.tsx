import SidebarComponent from "../../components/Sidebar/SidebarComponent";
import { useEffect, useState } from "react";
import { getTechnicalSupportByIdUserRequestService } from "./services/technicalSupport.services";
import { TechnicalSupportData } from "./models/technicalSupport.model";
import FormTechnicalSupport from "./components/FormTechnicalSupport";
import TableTechnicalSupport from "./components/TableTechnicalSupport";
import { dataTabletechnicalSupportAdapter as dataTableTechnicalSupportAdapter } from "./adapters/technicalSupport.adapters";

function TechnicalSupport(): JSX.Element {
  const idUser = localStorage.getItem("idUser");
  const [technicalSupportData, setTechnicalSupportData] = useState<
    TechnicalSupportData[]
  >([]);
  const getAllTechnicalSupportByUser = async (): Promise<void> => {
    try {
      if (idUser) {
        const response = await getTechnicalSupportByIdUserRequestService(
          +idUser
        );
        if (response.data) {
          setTechnicalSupportData(response.data);
        } else {
          setTechnicalSupportData([]);
        }
      } else {
        window.location.href = "/";
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllTechnicalSupportByUser();
  }, []);
  return (
    <div className="grid m-6">
      <SidebarComponent />
      {idUser && (
        <>
          <div className="col-12 md:col-12 sm:col-12 m-4 text-center">
            <h2>Contacta a soporte técnico</h2>
          </div>
          <div className="col-12 md:col-8 sm:col-12 m-5">
            <FormTechnicalSupport
              idUser={+idUser}
              getAllTechnicalSupportByUser={getAllTechnicalSupportByUser}
            />
          </div>
          {technicalSupportData.length > 0 ? (
            <div className="col-12 md:col-12 sm:col-12 m-4">
              <TableTechnicalSupport
                technicalSupportData={dataTableTechnicalSupportAdapter(
                  technicalSupportData
                )}
              />
            </div>
          ) : (
            <div className="col-12 md:col-12 sm:col-12 text-center p-error">
              <h4>Aún no tienes reportes</h4>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TechnicalSupport;
