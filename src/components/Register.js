import Header from "./Header";
import Authentication from "./Authentication";
import InfoTooltip from "./InfoTooltip";
import { useState } from "react";
import registrationSuccess from "../images/BlackCircleDone.svg";
import registrationError from "../images/RedCircleCross.svg";
import { auth } from "../utils/Auth";
import { useHistory } from "react-router-dom";

function Register() {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isRegistrationOk, setRegistrationOk] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  function handlePopupClose() {
    setPopupOpen(false);
    if (isRegistrationOk) history.push("/sign-in");
  }

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
    const email = e.target.email.value;
    const password = e.target.password.value;
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          setRegistrationOk(true);
          setPopupOpen(true);
        }
      })
      .catch((err) => {
        setRegistrationOk(false);
        setPopupOpen(true);
      });
  }
  return (
    <>
      <Header buttonName="Вход" path="/sign-in" />
      <Authentication
        header={"Регистрация"}
        buttonName={"Зарегистрироваться"}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        email={email}
        password={password}
        onSubmit={handleSubmit}
      />
      <InfoTooltip
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
        imgSrc={isRegistrationOk ? registrationSuccess : registrationError}
        title={
          isRegistrationOk
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."
        }
      />
    </>
  );
}

export default Register;
