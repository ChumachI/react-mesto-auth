import { NavLink } from "react-router-dom";

function Authentication({
  header,
  buttonName,
  onEmailChange,
  onPasswordChange,
  email,
  password,
  onSubmit,
}) {
  return (
    <div className="authentication">
      <hr className="authentication__line"></hr>
      <h1 className="authentication__header">{header}</h1>
      <form className="authentication__form" onSubmit={onSubmit}>
        <fieldset className="authentication__form-fieldset">
          <input
            className="authentication__form-field"
            type="email"
            name="email"
            placeholder="Email"
            onChange={onEmailChange}
            value={email}
          />
          <input
            className="authentication__form-field"
            type="password"
            name="password"
            placeholder="Пароль"
            onChange={onPasswordChange}
            value={password}
          />
        </fieldset>

        <button className="authentication__form-button" type="submit">
          {buttonName}
        </button>
        {header === "Регистрация" && (
          <p className="authentication__bottom-offer">
            Уже зарегистрированы?{" "}
            <NavLink className="authentication__bottom-link" to="/sign-in">
              Войти
            </NavLink>
          </p>
        )}
      </form>
    </div>
  );
}

export default Authentication;
