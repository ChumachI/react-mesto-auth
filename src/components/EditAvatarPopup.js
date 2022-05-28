import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const isEditAvatarPopupOpen = props.isOpen;
  const closeAllPopups = props.onClose;
  const onUpdateAvatar = props.onUpdateAvatar;

  const inputValue = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: inputValue.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar-edit"
      title="Обновить аватар"
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onSubmit={handleSubmit}
    >
      <div className="popup__input-container">
        <input
          className="popup__field"
          ref={inputValue}
          id="popup__avatar-link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__field-error popup__avatar-link-error"></span>
      </div>
      <button
        className="popup__save"
        type="submit"
        form="popup__form-avatar-edit"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
//popup__save_disabled
