import success from "../images/success.svg";
import fail from "../images/fail.svg";

export default function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_active" : ""}`}>
      <div className='popup__container'>
        <img
          src={props.isSuccess ? success : fail}
          alt={props.isSuccess ? "success" : "fail"}
          className='popup__tooltip-icon'
        ></img>
        <h2 className='popup__tooltip-text'>
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          type='button'
          className='popup__close-btn'
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
