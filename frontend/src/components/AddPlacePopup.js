import PopupWithForm from "./PopupWithForm";
import { useEffect, useRef } from "react";

export default function AddPlacePopup(props) {
  const linkRef = useRef();
  const nameRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddCard({
      link: linkRef.current.value,
      name: nameRef.current.value,
    });
    console.log(linkRef);
  }

  useEffect(() => {
    linkRef.current.value = '';
    nameRef.current.value = '';
  }, [props.isOpen])

  return (
    <PopupWithForm
      name='place'
      title='Новое место'
      btnTitle='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='popup__input popup__input_type_place-name'
        name='name'
        id='placeName-input'
        ref={nameRef}
        placeholder='Название'
        minLength='2'
        maxLength='30'
        required
      />
      <span className='popup__item-error placeName-input-error'></span>
      <input
        type='url'
        className='popup__input popup__input_type_place-link'
        name='link'
        id='link-input'
        ref={linkRef}
        placeholder='Ссылка на картинку'
        required
      />
      <span className='popup__item-error link-input-error'></span>
    </PopupWithForm>
  );
}
