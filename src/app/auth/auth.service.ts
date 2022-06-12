import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userIsAuthenticated = true;

  constructor() { }

  get userAuthenticated() {
    return this.userIsAuthenticated;
  }

  login(){
    this.userIsAuthenticated = true;
  }

  logout(){
    this.userIsAuthenticated = false;
  }
}
