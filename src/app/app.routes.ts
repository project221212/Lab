import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PatientListComponent } from './features/patients/patient-list/patient-list.component';
import { PatientRegistrationComponent } from './features/patients/patient-registration/patient-registration.component';
import { TestMasterComponent } from './features/tests/test-master/test-master.component';
import { PosComponent } from './features/billing/pos/pos.component';
import { ReportEntryComponent } from './features/reports/report-entry/report-entry.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'patients', component: PatientListComponent },
      { path: 'patients/new', component: PatientRegistrationComponent },
      { path: 'tests', component: TestMasterComponent },
      { path: 'billing', component: PosComponent },
      { path: 'reports', component: ReportEntryComponent },
    ]
  },
  { path: '**', redirectTo: 'login' }
];
