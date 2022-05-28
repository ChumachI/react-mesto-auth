import Header from "./Header";
import Authentication from "./Authentication";
import { useState } from "react";
import { auth } from "../utils/Auth";
import { useHistory } from "react-router-dom";

function Login({ handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function handleEmailChange(e) {
    e.preventDefault();
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    e.preventDefault();
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    auth.login(email, password).then((data) => {
      if (data.token) {
        handleLogin(email);
        resetLoginForm();
        history.push("/home");
      }
    });
  }

  function resetLoginForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className="authentication">
      <Header buttonName="Регистрация" path="/sign-up" />
      <Authentication
        header={"Вход"}
        buttonName={"Войти"}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        email={email}
        password={password}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Login;
