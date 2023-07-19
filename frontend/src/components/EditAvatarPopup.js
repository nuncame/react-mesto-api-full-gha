import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

export default function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      btnTitle='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='url'
        className='popup__input popup__input_type_avatar-link'
        name='avatar'
        id='avatar-input'
        ref={avatarRef}
        placeholder='Ссылка на картинку'
        required
      />
      <span className='popup__item-error avatar-input-error'></span>
    </PopupWithForm>
  );
}
