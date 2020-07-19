const LOCAL_STORAGE_KEY = 'token';

class Client {
  constructor() {
    this.useLocalStorage = (typeof localStorage !== 'undefined');

    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_KEY);
    } else {
      this.token = null;
    }
  }

  isLoggedIn() {
    return !!this.token;
  }

  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }

  logout() {
    this.removeToken();
  }
}

export const client = new Client();