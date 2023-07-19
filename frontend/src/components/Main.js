import Card from "./Card";
import Header from "./Header";
import Footer from "./Footer";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const userData = useContext(CurrentUserContext);

  return (
    <>
      <Header email={props.userEmail} isLoggedIn={props.isLoggedIn} onSignOut={props.onSignOut} />

      <main className='content'>
        <section className='profile'>
          <button
            type='button'
            className='profile__avatar-btn'
            onClick={props.onEditAvatar}
          >
            <img
              alt='Аватар'
              className='profile__avatar'
              src={userData.avatar}
            />
          </button>
          <div className='profile__info'>
            <h1 className='profile__name'>{userData.name}</h1>
            <button
              type='button'
              className='profile__edit-btn'
              onClick={props.onEditProfile}
            ></button>
            <p className='profile__title'>{userData.about}</p>
          </div>
          <button
            type='button'
            className='profile__add-btn'
            onClick={props.onAddPlace}
          ></button>
        </section>

        <section className='elements'>
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.handleCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}
