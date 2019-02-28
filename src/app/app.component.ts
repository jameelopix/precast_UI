import { Component } from '@angular/core';
import { LoginService } from './services/login.service';

import { Router } from '@angular/router';
import * as _ from "underscore";
import * as pivottable from "pivottable";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() { }


}
