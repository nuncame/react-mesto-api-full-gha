import { useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { api } from "../utils/Api";
import Main from "./Main";
import Register from "./Register";
import Login from "./Login";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ProtectedRouteElement from "./ProtectedRoute";
import * as mestoAuth from "../utils/mestoAuth";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoTooltipSuccess, setInfoTooltipSuccess] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  function handleRegister(email, password) {
    mestoAuth
      .register(email, password)
      .then(() => {
        setInfoTooltipSuccess(true);
        setInfoTooltipOpen(true);
        navigate("/login");
      })
      .catch(() => {
        setInfoTooltipSuccess(false);
        setInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    mestoAuth
      .login(email, password)
      .then((data) => {
        setUserEmail(email);
        localStorage.setItem("token", data.token);
        setCurrentUser(data);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setInfoTooltipSuccess(false);
        setInfoTooltipOpen(true);
      });
  }

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        mestoAuth
          .getContent(token)
          .then((data) => {
            if (data) {
              setLoggedIn(true);
              setUserEmail(data.email);
              navigate("/", { replace: true });
            } else {
              setLoggedIn(false);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    checkToken();
  }, []);

  

  function signOut() {
    localStorage.removeItem("token");
    setCurrentUser({});
    navigate("/login");
  }

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserData(), api.getCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => {
      return i === currentUser._id
    });

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(data) {
    api
      .setUserData(data)
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(link) {
    api
      .setAvatar(link)
      .then((newPic) => {
        setCurrentUser(newPic);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <div className='page'>
          <Routes>
            <Route
              path='/'
              element={
                <ProtectedRouteElement
                  element={
                    <Main
                      onEditAvatar={setIsEditAvatarPopupOpen}
                      onEditProfile={setIsEditProfilePopupOpen}
                      onAddPlace={setIsAddPlacePopupOpen}
                      cards={cards}
                      userEmail={userEmail}
                      handleCardClick={setSelectedCard}
                      onCardLike={handleCardLike}
                      onCardDelete={setIsConfirmDeletePopupOpen}
                      isLoggedIn={isLoggedIn}
                      onSignOut={signOut}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />
            <Route
              path='/register'
              element={
                <Register
                  onClose={closeAllPopups}
                  handleRegister={handleRegister}
                />
              }
            />
            <Route
              path='/login'
              element={<Login handleLogin={handleLogin} />}
            />
            <Route
              path='*'
              element={
                <div className='error404'>
                  <h2>Error 404</h2>
                  <p>Oops! Такой страницы не существует</p>
                  <Link to='/' className='error404__link'>
                    На главную
                  </Link>
                </div>
              }
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <ConfirmDeletePopup
            isOpen={isConfirmDeletePopupOpen}
            onClose={closeAllPopups}
            onConfirmDelete={handleCardDelete}
          />

          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccess={infoTooltipSuccess}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
