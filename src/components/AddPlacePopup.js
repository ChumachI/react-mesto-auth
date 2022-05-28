import { useEffect, useRef, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const isAddPlacePopupOpen = props.isOpen;
  const closeAllPopups = props.onClose;
  const handleAddPlaceSubmit = props.onAddCard;
  const [cardName, setCardName] = useState([]);
  const [inputLink, setInputLink] = useState([]);

  useEffect(() => {
    setCardName("");
    setInputLink("");
  }, [isAddPlacePopupOpen]);

  function handleNameChange(e) {
    setCardName(e.target.value);
  }

  function handleLinkChange(e) {
    setInputLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAddPlaceSubmit({ cardName, inputLink });
  }

  return (
    <PopupWithForm
      name="image-add"
      title="Новое место"
      isOpen={isAddPlacePopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          className="popup__field"
          id="popup__place-name"
          value={cardName}
          onChange={handleNameChange}
          type="text"
          name="name"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__field-error popup__place-name-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__field"
          id="popup__place-link"
          value={inputLink}
          onChange={handleLinkChange}
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__field-error popup__place-link-error"></span>
      </div>
      <button
        className="popup__save"
        type="submit"
        form="popup__form-image-add"
      >
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
//popup__save_disabled
