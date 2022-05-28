function ImagePopup(props) {
  const name = props.card.name;
  const link = props.card.link;
  const handleClose = props.onClose;
  return (
    <div
      className={`popup popup_type_image-zoom ${
        props.card.isOpen && " popup_opened"
      }`}
    >
      <div className="popup__zoom-container">
        <button
          className="popup__close"
          type="button"
          onClick={handleClose}
        ></button>
        <img className="popup__zoom-image" src={link} alt={name} />
        <label className="popup__zoom-label">{name}</label>
      </div>
    </div>
  );
}

export default ImagePopup;
