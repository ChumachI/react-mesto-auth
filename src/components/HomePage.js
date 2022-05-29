import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";

function HomePage(props) {


  return (
    <>
      <Header
        buttonName="Выйти"
        path="/sign-in"
        isloggedIn={props.loggedIn}
        onExitClick={props.handleExit}
        email={props.email}
      />

      <Main
        cards={props.cards}
        onEditProfile={props.onEditProfile}
        onAddPlace={props.onAddPlace}
        onEditAvatar={props.onEditAvatar}
        onCardClick={props.onCardClick}
        onCardLike={props.onCardLike}
        onCardDelete={props.onCardDelete}
      />

      <Footer />
      <EditAvatarPopup
        isOpen={props.isEditAvatarPopupOpen}
        onClose={props.closeAllPopups}
        onUpdateAvatar={props.onUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={props.isEditProfilePopupOpen}
        onClose={props.closeAllPopups}
        onUpdateUser={props.onUpdateUser}
      />
      <AddPlacePopup
        isOpen={props.isAddPlacePopupOpen}
        onClose={props.closeAllPopups}
        onAddCard={props.onAddCard}
      />
      <ImagePopup card={props.selectedCard} onClose={props.closeAllPopups} />
    </>
  );
}

export default HomePage;
