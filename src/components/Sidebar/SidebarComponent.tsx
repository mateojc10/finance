import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useState } from "react";
import { Ripple } from "primereact/ripple";
import "./css/sidebar.style.css";
import { useNavigate } from "react-router-dom";
function SidebarComponent(): JSX.Element {
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        content={({ closeIconRef, hide }): JSX.Element => (
          <div
            id="app-sidebar-2"
            className="surface-section h-screen block flex-shrink-0 absolute lg:static left-0 top-0 z-1 border-right-1 surface-border select-none"
            style={{ width: "280px" }}
          >
            <div className="flex flex-column h-full">
              <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                <span className="inline-flex align-items-center gap-2">
                  <span className="font-semibold text-2xl text-primary">
                    Menú
                  </span>
                </span>
                <span>
                  <Button
                    type="button"
                    onClick={(e) => hide(e)}
                    icon="pi pi-times"
                    rounded
                    outlined
                    className="h-2rem w-2rem"
                  ></Button>
                </span>
              </div>
              <div className="overflow-y-auto">
                <ul className="list-none p-3 m-0">
                  <li>
                    <a
                      href="/inicio"
                      className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-home mr-2"></i>
                      <span className="font-medium">Inicio</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/profile"
                      className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-user mr-2"></i>
                      <span className="font-medium">Perfil</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/transfer"
                      className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-chart-bar mr-2"></i>
                      <span className="font-medium">Trasancciones</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/support"
                      className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-wrench mr-2"></i>
                      <span className="font-medium">Soporte técnico</span>
                      <Ripple />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/"
                      className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors w-full"
                    >
                      <i className="pi pi-cog mr-2"></i>
                      <span className="font-medium">Cerrar sesión</span>
                      <Ripple />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      ></Sidebar>
      <div className="floating-div flex-wrap gap-4">
        <div className="flex mb-2">
          <Button
            tooltip="Menú"
            icon="pi pi-bars"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className="flex">
          <Button
            tooltip="Inicio"
            icon="pi pi-home"
            onClick={() => navigate("/inicio")}
          />
        </div>
        <div className="flex mt-2">
          <Button
            tooltip="Perfil"
            icon="pi pi-user"
            onClick={() => navigate("/profile")}
          />
        </div>
        <div className="flex mt-2">
          <Button
            tooltip="Transacciones"
            icon="pi pi-chart-bar"
            onClick={() => navigate("/transfer")}
          />
        </div>
        <div className="flex mt-2">
          <Button
            tooltip="Soporte"
            icon="pi  pi-wrench"
            onClick={() => navigate("/support")}
          />
        </div>
        <div className="flex mt-2">
          <Button
            tooltip="Salida segura"
            icon="pi pi-sign-out"
            onClick={() => navigate("/")}
          />
        </div>
      </div>
    </>
  );
}

export default SidebarComponent;
