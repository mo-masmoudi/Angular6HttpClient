import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { environment } from "../../environments/environment";
import { User } from "./user.model";
import { ModifiedUser } from "./modified-user.model";
import { FriendModel } from "./friend-model.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  selectedUser: User = {
    fullName: "",
    email: "",
    password: "",
    age: "",
    famille: "",
    race: "",
    nourriture: ""
  };

  modifiedUser: ModifiedUser = {
    _id: "",
    fullName: "",
    email: "",
    age: "",
    famille: "",
    race: "",
    nourriture: ""
  };

  friendModel: FriendModel = {
    _id: "",
    fullName: ""
  };

  newFriend: string;

  noAuthHeader = { headers: new HttpHeaders({ NoAuth: "True" }) };

  constructor(private http: HttpClient) {}

  //HttpMethods

  postUser(user: User) {
    return this.http.post(
      environment.apiBaseUrl + "/register",
      user,
      this.noAuthHeader
    );
  }

  login(authCredentials) {
    return this.http.post(
      environment.apiBaseUrl + "/authenticate",
      authCredentials,
      this.noAuthHeader
    );
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + "/userProfile");
  }

  putUser(user: ModifiedUser) {
    return this.http.put(
      environment.apiBaseUrl + `/userProfile/${user._id}`,
      user
    );
  }

  addFriend(friend: FriendModel) {
    return this.http.put(environment.apiBaseUrl + `/addfriend/${friend._id}`, {
      fullName: friend.fullName
    });
  }

  deleteFriend(friend: FriendModel) {
    return this.http.put(
      environment.apiBaseUrl + `/deletefriend/${friend._id}`,
      { fullName: friend.fullName }
    );
  }

  //Helper Methods

  setToken(token: string) {
    localStorage.setItem("token", token);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  deleteToken() {
    localStorage.removeItem("token");
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split(".")[1]);
      return JSON.parse(userPayload);
    } else return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload) return userPayload.exp > Date.now() / 1000;
    else return false;
  }
}
