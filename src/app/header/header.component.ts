import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];


  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Purchase',
        items: [{
          label: 'Purchase Order',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/purchaseorder'
        },
        { label: 'Purchase Register',
        routerLink: '/purchaseregister' },
        { label: 'Inward Register' }
        ]
      },
      {
        label: 'Cash & Bank',
        icon: 'pi pi-fw pi-pencil',
        items: [{
          label: 'Account Details',
          icon: 'pi pi-fw pi-plus',
          routerLink: '/accountdetails'
        }]
      }
    ];
  }

  logout() {
    this.loginService.loggedin = false;
    this.router.navigateByUrl('/');
  }
}
