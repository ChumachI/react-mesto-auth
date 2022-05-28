import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { useContext, useEffect } from "react";

function Card(props) {
  const link = props.link;
  const name = props.name;
  const ownerId = props.owner._id;
  const likes = props.likes;
  const likesCounter = props.likes.length;

  const currentUser = useContext(CurrentUserContext);
  const isOwn = ownerId === currentUser._id;
  let isLiked = likes.some((like) => like._id === currentUser._id);
  const cardDeleteButtonClassName = `place__delete  ${
    isOwn && "place__delete_active"
  }`;
  const cardLikeButtonClassName = `${
    isLiked ? "place__like place__like_active" : "place__like"
  }`;

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLike() {
    props.onLikeClick(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <div className="place">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="button"
      ></button>
      <img
        className="place__image"
        src={link}
        onClick={handleClick}
        alt={name}
      />
      <div className="place__bottom">
        <h2 className="place__name">{name}</h2>
        <div className="place__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLike}
            type="button"
          ></button>
          <label className="place__like-counter">{likesCounter}</label>
        </div>
      </div>
    </div>
  );
}

export default Card;
