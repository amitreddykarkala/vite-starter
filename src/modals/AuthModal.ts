import jwt_decode from "jwt-decode";
import axios from "axios";

// TO FIX: Refresh Token Expiry check in else
class AuthModel {
  accessToken: string | null;
  refreshToken: string | null;

  _load() {
    this.accessToken = localStorage.getItem("AccessToken");
    this.refreshToken = localStorage.getItem("RefreshToken");
  }

  _refresh(reload = false) {
    axios
      .get("https://console.gateway.senslabs.io/api/tokens/refresh")
      .then((e: any) => {
        return e.json();
      })
      .then((r: any) => {
        localStorage.setItem("AccessToken", r.AccessToken);
        if (reload) {
          window.location.reload();
        }
      });
  }

  constructor() {
    this.accessToken = localStorage.getItem("AccessToken");
    this.refreshToken = localStorage.getItem("RefreshToken");
    if (this.isAccessExpired()) {
      this._refresh(true);
    } else if (this.isAccessExpiring()) {
      this._refresh();
    }
  }

  isAccessExpiring() {
    this._load();
    if (this.accessToken) {
      const decoded: any = jwt_decode(this.accessToken);
      return decoded.exp - 3600 < new Date().getTime() / 1000;
    }
    return true;
  }

  isAccessExpired() {
    this._load();
    if (this.accessToken) {
      const decoded: any = jwt_decode(this.accessToken);
      return decoded.exp < new Date().getTime() / 1000;
    }
    return true;
  }

  isRefreshExpired() {
    this._load();
    if (this.refreshToken) {
      const decoded: any = jwt_decode(this.refreshToken);
      return decoded.exp < new Date().getTime() / 1000;
    }
    return true;
  }

  getSubject() {
    this._load();
    if (this.accessToken) {
      const decoded: any = jwt_decode(this.accessToken);
      return JSON.parse(decoded.sub);
    }
    return null;
  }

  getSubjectValue(key: string) {
    const sub = this.getSubject();
    if (sub) {
      return sub[key];
    }
    return null;
  }

  getOperatorMedium(): string {
    let mediumValue = "" + this.getSubjectValue("Email");
    if(mediumValue === null || mediumValue === undefined || mediumValue === ""){
      mediumValue = "" + this.getSubjectValue("Mobile");
    }
    return mediumValue;
  }

  hasRole(role: string): boolean {
    const authRole = "" + this.getSubjectValue("AuthRole");
    return authRole.indexOf(role) >= 0;
  }

  verified() {
    return (
      this.getSubjectValue("TokenType") === "AccessToken" &&
      !this.isAccessExpired()
    );
  }
}

export { AuthModel };
