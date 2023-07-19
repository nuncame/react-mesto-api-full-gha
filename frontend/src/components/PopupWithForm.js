export default function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_active" : ""}`}>
      <div className='popup__container'>
        <h2 className='popup__header'>{props.title}</h2>
        <form
          className={`popup__form popup__form_type_${props.name}`}
          name='popupForm'
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type='submit' className='popup__save-btn'>
            {props.btnTitle}
          </button>
        </form>
        <button
          type='button'
          className='popup__close-btn'
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
