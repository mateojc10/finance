import { useEffect } from "react";
import FormLogin from "./components/FormLogin";
import "./styles/login.css";
function Login(): JSX.Element {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="grid background-image">
      <div className="col-6 md:col-6 sm:col-12 form-login">
        <h2 className="text-center">Acceso</h2>
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
