import {ApiConfig} from './ApiConfig.js';

class Api {
    constructor(options) {
        this._commonUrlPart = options.commonUrlPart;
        this._headers = options.headers;
    }

    _checkResult(result) {
        if (result.ok) {
          return result.json();
        }
        else {
         return Promise.reject(`Ошибка: ${result.status}`);
        } 
    }
 
    getInitialCards() {
        return fetch(`${this._commonUrlPart}/cards`, {
          headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

   
    getUserInfo(){
        return fetch(`${this._commonUrlPart}/users/me`, {
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

 
    setProfileInfo(userName, userInfo){
        return fetch(`${this._commonUrlPart}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: `${userName}`,
                about: `${userInfo}`
            }),  
        })
        .then(result => this._checkResult(result))
    }

    postNewCard({cardName, inputLink}){
        return fetch(`${this._commonUrlPart}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name : cardName,
                link : inputLink,
            })
        })
        .then(result => this._checkResult(result))
    }

    changeLikeCardStatus(id, isLiked){
        const option = `${isLiked ? 'DELETE' : 'PUT'}`;
        return fetch(`${this._commonUrlPart}/cards/${id}/likes`,{
            method: option,
            headers: this._headers
        })
        .then(result => this._checkResult(result))

    }

    getCardLikes(id){
        
        return fetch(`${this._commonUrlPart}/cards/${id}/likes`,{
            method: 'GET',
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

    deleteCard(id){
        if(!id) return;
        return fetch(`${this._commonUrlPart}/cards/${id}`,{
            method: 'DELETE',
            headers: this._headers
        })
        .then(result => this._checkResult(result))
    }

    setAvatar(link){
        return fetch(`${this._commonUrlPart}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(result => this._checkResult(result))
    }


}

export const api = new Api(ApiConfig);