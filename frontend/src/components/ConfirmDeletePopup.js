import PopupWithForm from "./PopupWithForm";

export default function ConfirmDeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();

    props.onConfirmDelete(props.isOpen);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      btnTitle='Да'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}
