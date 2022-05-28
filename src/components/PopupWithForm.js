import React from "react";

function PopupWithForm(props) {
  const isOpen = props.isOpen;
  const title = props.title;
  const name = props.name;
  const handleClose = props.onClose;
  const handleSubmit = props.onSubmit;

  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={handleClose}
        ></button>
        <h3 className="popup__header">{title}</h3>
        <form
          className="popup__form"
          id={`popup__form-${name}`}
          name={`popup__form-${name}`}
          onSubmit={handleSubmit}
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
