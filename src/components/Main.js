import { useContext, useEffect, useState } from "react";
import editPenImg from "../images/pen.svg";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const onEditProfile = props.onEditProfile;
  const onAddPlace = props.onAddPlace;
  const onEditAvatar = props.onEditAvatar;
  const onCardClick = props.onCardClick;
  const handleCardLike = props.onCardLike;
  const handleCardDelete = props.onCardDelete;
  const cards = props.cards;

  const currentUser = useContext(CurrentUserContext);
  const userName = currentUser.name;
  const userDescription = currentUser.about;
  const userAvatar = currentUser.avatar;

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar"
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          <div className="profile__avatar-overlay" onClick={onEditAvatar}>
            <img
              className="profile__avatar-edit-icon"
              src={editPenImg}
              alt="аватар"
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__name-and-edit-button">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__status">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="places">
        {cards.map((card) => {
          return (
            <Card
              key={card._id}
              id={card._id}
              name={card.name}
              link={card.link}
              likes={card.likes}
              onCardClick={onCardClick}
              owner={card.owner}
              onLikeClick={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;
