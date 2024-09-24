import { useEffect } from "react";
import FormLogin from "./components/FormLogin";
import "./styles/login.css";
function Login(): JSX.Element {
  useEffect(() => {
    localStorage.clear();
  }, []);
  return (
    <div className="grid background-image">
      <div className="col-12 md:col-6 sm:col-12 bg-gray-800">
        <h2 className="text-center">Bifinancing</h2>
        <FormLogin />
      </div>
    </div>
  );
}

export default Login;
