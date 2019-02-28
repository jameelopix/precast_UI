import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  public showError: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      username: '',
      password: ''
    });
  }

  login() {
    this.showError = false;

    let username = this.formGroup.value['username'];
    let password = this.formGroup.value['password'];
    console.log("------------------------------");
    console.log(username);
    console.log(password);
    console.log("------------------------------");

    if ("asraf" === username && "asraf" === password) {
      this.loginService.loggedin = true;
      this.router.navigateByUrl('/rawmaterialpage');
    } else {
      this.showError = true;
    }
  }

}
