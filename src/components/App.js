import Login from "./Login";
import ProtectedRoute from "./ProtectedRout.js";
import HomePage from "./HomePage.js";
import { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../index.css";
import { api } from "../utils/Api.js";
import Register from "./Register";
import { useHistory } from "react-router-dom";
import { auth } from "../utils/Auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then((result) => {
        setCards(result[0]);
        setCurrentUser(result[1]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        auth.getContent(jwt).then((res) => {
          if (res) {
            setEmail(res.data.email);
            setLoggedIn(true);
            history.push("/home");
          }
        });
      }
    }
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card, isOpen: true });
  }

  function handleUpdateUser(data) {
    api
      .setProfileInfo(data.name, data.about)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setAvatar(data.avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card.id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card.id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card.id)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card.id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
  }

  function handleLogin(email) {
    setLoggedIn(true);
    setEmail(email);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <ProtectedRoute
            path="/home"
            loggedIn={loggedIn}
            component={HomePage}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            onUpdateUser={handleUpdateUser}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            onAddCard={handleAddPlaceSubmit}
            selectedCard={selectedCard}
            closeAllPopups={closeAllPopups}
            email={email}
            history={history}
          />
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/home" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
