import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Search, Plus, MoreVertical, Edit, FileText } from 'lucide-angular';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.scss',
})
export class PatientListComponent {
  readonly Search = Search;
  readonly Plus = Plus;
  readonly MoreVertical = MoreVertical;
  readonly Edit = Edit;
  readonly FileText = FileText;

  patients = [
    { id: 'PT-1042', name: 'Rahul Sharma', age: 45, gender: 'Male', mobile: '+91 9876543210', registered: '18 Apr 2026', tests: 2 },
    { id: 'PT-1041', name: 'Priya Patel', age: 32, gender: 'Female', mobile: '+91 8765432109', registered: '18 Apr 2026', tests: 1 },
    { id: 'PT-1040', name: 'Amit Kumar', age: 28, gender: 'Male', mobile: '+91 7654321098', registered: '17 Apr 2026', tests: 4 },
    { id: 'PT-1039', name: 'Sneha Gupta', age: 54, gender: 'Female', mobile: '+91 6543210987', registered: '17 Apr 2026', tests: 1 },
    { id: 'PT-1038', name: 'Vikram Singh', age: 61, gender: 'Male', mobile: '+91 5432109876', registered: '16 Apr 2026', tests: 3 },
  ];
}
