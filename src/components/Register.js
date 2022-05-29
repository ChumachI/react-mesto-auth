import Header from "./Header";
import Authentication from "./Authentication";

function Register({
  handleEmailChange,
  handlePasswordChange,
  handleRegisterSubmit,
  email,
  password
}) {
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
        onSubmit={handleRegisterSubmit}
      />
    </>
  );
}

export default Register;
