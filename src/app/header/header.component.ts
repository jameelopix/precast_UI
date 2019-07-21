import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";

import { Router } from "@angular/router";

import { MenuItem } from "primeng/api";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];

  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.items = [
      {
        label: "Purchase",
        items: [
          {
            label: "Purchase Order",
            icon: "pi pi-fw pi-plus",
            routerLink: "/purchaseorder"
          },
          {
            label: "Purchase Register",
            icon: "pi pi-fw pi-plus",
            routerLink: "/purchaseregister"
          },
          {
            label: "Inward Register",
            icon: "pi pi-fw pi-plus",
            routerLink: "/inwardpage"
          }
        ]
      },
      {
        label: "Cash & Bank",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Account Details",
            icon: "pi pi-fw pi-plus",
            routerLink: "/accountdetails"
          }
        ]
      },
      {
        label: "Reference",
        icon: "pi pi-fw pi-pencil",
        items: [
          {
            label: "Vendor Details",
            icon: "pi pi-fw pi-plus",
            routerLink: "/vendordetails"
          },
          {
            label: "Party Master",
            icon: "pi pi-fw pi-plus",
            routerLink: "/partymaster"
          },
          {
            label: "Company",
            icon: "pi pi-fw pi-plus",
            routerLink: "/company"
          },
          {
            label: "Raw Material",
            icon: "pi pi-fw pi-plus",
            routerLink: "/rawmaterialpage"
          },
          {
            label: "Mix Design",
            icon: "pi pi-fw pi-plus",
            routerLink: "/mixdesignpage"
          },
          {
            label: "Project",
            icon: "pi pi-fw pi-plus",
            routerLink: "/projectpage"
          },
          {
            label: "Element Details",
            icon: "pi pi-fw pi-plus",
            routerLink: "/elementpage"
          },
          {
            label: "Element Type Details",
            icon: "pi pi-fw pi-plus",
            routerLink: "/elementtypepage"
          }
        ]
      }
    ];
  }

  logout() {
    this.loginService.loggedin = false;
    this.router.navigateByUrl("/");
  }
}
