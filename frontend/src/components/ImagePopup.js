export default function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image ${
        Object.keys(props.card).length !== 0 ? "popup_active" : ""
      }`}
    >
      <div className='popup__container popup__container_type_image'>
        <figure className='popup__figure'>
          <img
            className='popup__picture'
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className='popup__caption'>{props.card.name}</figcaption>
        </figure>
        <button
          type='button'
          className='popup__close-btn popup__close-btn_type_image'
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}
