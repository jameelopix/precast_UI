import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectComponent } from './project/project.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { PdfComponent } from './pdf/pdf.component';
import { CastingActivityComponent } from './casting-activity/casting-activity.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { CompanyComponent } from './company/company.component';
import { BankAccountComponent } from './bank-account/bank-account.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'projectpage', component: ProjectComponent },
  { path: 'rawmaterialpage', component: RawMaterialComponent },
  { path: 'castingpage', component: CastingActivityComponent },
  { path: 'pdfpage', component: PdfComponent },
  { path: 'report', component: ReportComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'bankaccount', component: BankAccountComponent },
  { path: '**', component: LoginComponent },
  // ,
  // { path: 'elementdetailspage', component: ElementDetailsComponent },
  // { path: 'productionplanpage', component: ProductionPlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
