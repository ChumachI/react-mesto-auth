class Auth {
  constructor() {
    this._commonUrlPart = "https://auth.nomoreparties.co";
  }

  _checkResult(result) {
    if (result.ok) {
      return result.json();
    } else {
      return Promise.reject(`Ошибка: ${result.status}`);
    }
  }

  register(email, password) {
    return fetch(`${this._commonUrlPart}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password,
        email,
      }),
    }).then((result) => this._checkResult(result));
  }

  login(email, password) {
    return fetch(`${this._commonUrlPart}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        password: password,
        email: email,
      }),
    })
      .then((result) => this._checkResult(result))
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          return;
        }
      });
  }

  getContent(token) {
    return fetch(`${this._commonUrlPart}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => this._checkResult(result));
  }
}

export const auth = new Auth();
