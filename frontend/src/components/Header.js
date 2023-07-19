import logoMesto from "../images/logoMesto.svg";
import { Link, useLocation } from "react-router-dom";

export default function Header(props) {
  const location = useLocation();

  return (
    <header className='header'>
      {props.isLoggedIn ? (
        <Link to='/'>
          <img src={logoMesto} alt='Место' className='header__logo' />
        </Link>
      ) : (
        <Link to='/login'>
          <img src={logoMesto} alt='Место' className='header__logo' />
        </Link>
      )}
      <div className='header__caption'>
        <p className='header__email'>{props.email}</p>
        <ul className='header__nav'>
          {location.pathname === "/" && (
            <li>
              <button
                onClick={props.onSignOut}
                className='header__link header__logout-btn'
              >
                Выйти
              </button>
            </li>
          )}
          {location.pathname === "/register" && (
            <li>
              <Link to='/' className='header__link'>
                Войти
              </Link>
            </li>
          )}
          {location.pathname === "/login" && (
            <li>
              <Link to='/register' className='header__link'>
                Регистрация
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
