import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const isOpen = props.isOpen;
  const onClose = props.onClose;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleUpdateUser = props.onUpdateUser;

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          className="popup__field popup__field_for_name"
          value={name || ""}
          onChange={handleNameChange}
          id="popup__name"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          required
          noValidate
          placeholder="Имя"
        />
        <span className="popup__field-error popup__name-error"></span>
      </div>
      <div className="popup__input-container">
        <input
          className="popup__field popup__field_for_status"
          value={description || ""}
          onChange={handleDescriptionChange}
          id="popup__status"
          name="status"
          type="text"
          minLength="2"
          maxLength="200"
          required
          noValidate
          placeholder="Занятие"
        />
        <span className="popup__field-error popup__status-error"></span>
      </div>
      <button
        className="popup__save"
        type="submit"
        form="popup__form-profile-edit"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
