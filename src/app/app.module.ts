import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientService } from './client.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { TreeTableModule } from 'primeng/treetable';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenubarModule } from 'primeng/menubar';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

import { MixdesignComponent } from './mixdesign/mixdesign.component';
import { ProjectComponent } from './project/project.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { PdfComponent } from './pdf/pdf.component';
import { CastingActivityComponent } from './casting-activity/casting-activity.component';
import { GridComponent } from './grid/grid.component';
import { SingleSelectComponent } from './single-select/single-select.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { CompanyComponent } from './company/company.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { CashTransferComponent } from './cash-transfer/cash-transfer.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { ColiseumGridComponent } from './coliseum-grid/coliseum-grid.component';
import { PurchaseRegisterComponent } from './purchase-register/purchase-register.component';
import { ColiseumChildGridComponent } from './coliseum-child-grid/coliseum-child-grid.component';
import { VendorComponent } from './vendor/vendor.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MixdesignComponent,
    ProjectComponent,
    RawMaterialComponent,
    PdfComponent,
    CastingActivityComponent,
    GridComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    LoginComponent,
    ReportComponent,
    CompanyComponent,
    BankAccountComponent,
    CashTransferComponent,
    PurchaseOrderComponent,
    AccountDetailsComponent,
    ColiseumGridComponent,
    PurchaseRegisterComponent,
    ColiseumChildGridComponent,
    VendorComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    TableModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    PaginatorModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextModule,
    HttpClientModule,
    TreeTableModule,
    MultiSelectModule,
    MenubarModule,
    CalendarModule,
    MessagesModule,
    MessageModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
