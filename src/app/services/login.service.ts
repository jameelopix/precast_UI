import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedin: boolean = false;

  constructor() { }
}
