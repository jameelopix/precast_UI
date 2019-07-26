import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ProjectComponent } from "./project/project.component";
import { RawMaterialComponent } from "./raw-material/raw-material.component";
import { PdfComponent } from "./pdf/pdf.component";
import { CastingActivityComponent } from "./casting-activity/casting-activity.component";
import { LoginComponent } from "./login/login.component";
import { ReportComponent } from "./report/report.component";
import { CompanyComponent } from "./company/company.component";
import { BankAccountComponent } from "./bank-account/bank-account.component";
import { PurchaseOrderComponent } from "./purchase-order/purchase-order.component";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { PurchaseRegisterComponent } from "./purchase-register/purchase-register.component";
import { VendorComponent } from "./vendor/vendor.component";
import { PartyMasterComponent } from "./party-master/party-master.component";
import { MixdesignComponent } from "./mixdesign/mixdesign.component";
import { MixtureComponent } from "./mixture/mixture.component";
import { ElementComponent } from "./element/element.component";
import { ElementTypeComponent } from "./element-type/element-type.component";
import { ItemAmountDetailsComponent } from "./item-amount-details/item-amount-details.component";
import { ProductionPlanReportComponent } from "./production-plan-report/production-plan-report.component";
import { SubContractorComponent } from "./sub-contractor/sub-contractor.component";
import { LabourWorkEntryComponent } from "./labour-work-entry/labour-work-entry.component";
import { LabourRateComponent } from "./labour-rate/labour-rate.component";

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "projectpage", component: ProjectComponent },
  { path: "elementtypepage", component: ElementTypeComponent },
  { path: "elementpage", component: ElementComponent },
  { path: "rawmaterialpage", component: RawMaterialComponent },
  { path: "castingpage", component: CastingActivityComponent },
  { path: "pdfpage", component: PdfComponent },
  { path: "report", component: ReportComponent },
  { path: "company", component: CompanyComponent },
  { path: "bankaccount", component: BankAccountComponent },
  { path: "purchaseorder", component: PurchaseOrderComponent },
  { path: "purchaseregister", component: PurchaseRegisterComponent },
  { path: "accountdetails", component: AccountDetailsComponent },
  { path: "vendordetails", component: VendorComponent },
  { path: "partymaster", component: PartyMasterComponent },
  { path: "mixdesignpage", component: MixtureComponent },
  { path: "inwardpage", component: ItemAmountDetailsComponent },
  { path: "productionReport", component: ProductionPlanReportComponent },
  { path: "subcontractor", component: SubContractorComponent },  
  { path: "labourworkentry", component: LabourWorkEntryComponent },  
  { path: "labourrate", component: LabourRateComponent },
  { path: "**", component: LoginComponent }
  // ,
  // { path: 'elementdetailspage', component: ElementDetailsComponent },
  // { path: 'productionplanpage', component: ProductionPlanComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
