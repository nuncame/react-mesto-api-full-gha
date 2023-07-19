import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
  const userData = useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === userData._id;
  const isLiked = props.card.likes.some((i) => i._id === userData._id);

  const elementLikeButtonClassName = `element__like ${
    isLiked && "element__like_active"
  }`;

  function handleCardClick(evt) {
    evt.preventDefault();
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
      <article className='element'>
        <a
          className='element__image-fullscreen'
          href='#'
          onClick={handleCardClick}
        >
          <img
            src={props.card.link}
            alt={props.card.name}
            className='element__picture'
          />
        </a>
        {isOwn && (
          <button
            className='element__trash'
            type='button'
            onClick={handleDeleteClick}
          />
        )}
        <div className='element__capture'>
          <h2 className='element__text'>{props.card.name}</h2>
          <div className='element__like-section'>
            <button
              className={elementLikeButtonClassName}
              type='button'
              onClick={handleLikeClick}
            ></button>
            <p className='element__like-quantity'>{props.card.likes.length}</p>
          </div>
        </div>
      </article>
  );
}
