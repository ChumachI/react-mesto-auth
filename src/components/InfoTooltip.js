import PopupWithForm from "./PopupWithForm";
function InfoTooltip({ isOpen, onClose, imgSrc, title }) {
  return (
    <div className={`popup popup_type_InfoTooltip ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__info-image" src={imgSrc} />
        <h3 className="popup__header popup__header_type_info-tip">{title}</h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
