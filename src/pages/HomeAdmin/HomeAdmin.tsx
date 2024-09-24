import TabMenuAdmin from "./components/TabMenuAdmin/TabMenuAdmin";

function HomeAdmin(): JSX.Element {
  return (
    <div className="grid">
      <div className="text-center m-8">
        <TabMenuAdmin />
        <h1 className="text-center">Espacio administrador</h1>
      </div>
    </div>
  );
}

export default HomeAdmin;
