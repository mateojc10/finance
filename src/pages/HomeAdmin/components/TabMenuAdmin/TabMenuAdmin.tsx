import { MenuItem } from "primereact/menuitem";
import "./styles/tabMenuAdmin.css";
import { Menubar } from "primereact/menubar";

function TabMenuAdmin(): JSX.Element {
  const items: MenuItem[] = [
    { label: "Usuarios", icon: "pi pi-home", url: "/admin/users" },
    { label: "Sorteos", icon: "pi pi-chart-line", url: "/admin/lottery" },
    { label: "Retiros", icon: "pi pi-chart-line", url: "/admin/withdrawal" },
    {
      label: "Soporte técnico",
      icon: "pi pi-chart-line",
      url: "/admin/technical-support",
    },
    {
      label: "Cerrar sesión",
      icon: "pi pi-sign-out",
      url: "/",
    },
  ];
  return (
    <div className="grid">
      <Menubar model={items} className="col-12 md:col-12 sm:col-12" />
    </div>
  );
}

export default TabMenuAdmin;
