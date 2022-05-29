import Header from "./Header";
import Authentication from "./Authentication";
import InfoTooltip from "./InfoTooltip"
import registrationError from "../images/RedCircleCross.svg";

function Login({
  handleEmailChange,
  handlePasswordChange,
  handleLoginSubmit,
  handleInfoPopupClose,
  isPopupOpen,
  email,
  password,
}) {
  return (
    <>
      <Header buttonName="Регистрация" path="/sign-up" />
      <Authentication
        header={"Вход"}
        buttonName={"Войти"}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        email={email}
        password={password}
        onSubmit={handleLoginSubmit}
      />
      <InfoTooltip
        isOpen={isPopupOpen}
        onClose={handleInfoPopupClose}
        imgSrc={registrationError}
        title= {"Что-то пошло не так! Попробуйте ещё раз."}
      />
    </>
  );
}

export default Login;
