import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, FileText, CheckCircle, Printer, Download, Save, FlaskConical } from 'lucide-angular';

@Component({
  selector: 'app-report-entry',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './report-entry.component.html',
})
export class ReportEntryComponent {
  readonly Search = Search;
  readonly FileText = FileText;
  readonly CheckCircle = CheckCircle;
  readonly Printer = Printer;
  readonly Download = Download;
  readonly Save = Save;
  readonly FlaskConical = FlaskConical;

  currentDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  parameters = [
    { name: 'Hemoglobin', value: '13.5', unit: 'g/dL', ref: '13.0 - 17.0', isAbnormal: false },
    { name: 'Total RBC Count', value: '4.8', unit: 'mill/cumm', ref: '4.5 - 5.5', isAbnormal: false },
    { name: 'Total WBC Count', value: '11500', unit: '/cumm', ref: '4000 - 11000', isAbnormal: true },
    { name: 'Platelet Count', value: '2.5', unit: 'lakhs/cumm', ref: '1.5 - 4.5', isAbnormal: false },
  ];
}
