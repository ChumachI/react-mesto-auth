import { NavLink } from "react-router-dom";
import logo from "../images/header-logo.svg";

function Header({ buttonName, path, isloggedIn, onExitClick, email }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="лого заголовка" />
      <div className="header__email-container">
        {isloggedIn && <p>{email}</p>}
        <NavLink onClick={onExitClick} className="header__nav-link" to={path}>
          {" "}
          {buttonName}{" "}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
