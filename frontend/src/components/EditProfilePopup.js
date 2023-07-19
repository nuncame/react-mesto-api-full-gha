import PopupWithForm from "./PopupWithForm";
import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");


  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameInput(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionInput(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      name='info'
      title='Редактировать профиль'
      btnTitle='Сохранить'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        className='popup__input popup__input_textfield_name'
        name='name'
        id='name-input'
        value={name || ''}
        onChange={handleNameInput}
        placeholder='Введите имя'
        minLength='2'
        maxLength='40'
        required
      />
      <span className='popup__item-error name-input-error'></span>
      <input
        type='text'
        className='popup__input popup__input_textfield_title'
        name='about'
        id='title-input'
        value={description || ''}
        onChange={handleDescriptionInput}
        placeholder='Введите профессию'
        minLength='2'
        maxLength='200'
        required
      />
      <span className='popup__item-error title-input-error'></span>
    </PopupWithForm>
  );
}
