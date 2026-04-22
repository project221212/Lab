import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Plus, Edit, Trash2, Filter } from 'lucide-angular';

@Component({
  selector: 'app-test-master',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './test-master.component.html',
  styleUrl: './test-master.component.scss',
})
export class TestMasterComponent {
  readonly Search = Search;
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Filter = Filter;

  tests = [
    { id: 'TST-001', name: 'Complete Blood Count (CBC)', category: 'Hematology', department: 'Pathology', price: 450, range: 'Varies by parameter' },
    { id: 'TST-002', name: 'Lipid Profile', category: 'Biochemistry', department: 'Pathology', price: 800, range: 'Total Chol < 200 mg/dL' },
    { id: 'TST-003', name: 'Thyroid Profile (T3, T4, TSH)', category: 'Hormones', department: 'Endocrinology', price: 1200, range: 'TSH: 0.4 - 4.0 mIU/L' },
    { id: 'TST-004', name: 'HbA1c', category: 'Biochemistry', department: 'Pathology', price: 500, range: '< 5.7%' },
    { id: 'TST-005', name: 'Liver Function Test (LFT)', category: 'Biochemistry', department: 'Pathology', price: 900, range: 'Varies by parameter' },
  ];
}
