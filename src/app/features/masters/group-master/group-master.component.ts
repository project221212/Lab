import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Plus, Save, Edit, Trash2, X, RefreshCw, Download, Filter, ToggleLeft, ToggleRight, ListPlus, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-angular';

@Component({
  selector: 'app-group-master',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './group-master.component.html',
  styleUrl: './group-master.component.scss'
})
export class GroupMasterComponent implements OnInit {
  readonly Search = Search;
  readonly Plus = Plus;
  readonly Save = Save;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly X = X;
  readonly RefreshCw = RefreshCw;
  readonly Download = Download;
  readonly Filter = Filter;
  readonly ToggleLeft = ToggleLeft;
  readonly ToggleRight = ToggleRight;
  readonly ListPlus = ListPlus;
  readonly ChevronDown = ChevronDown;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly ChevronsLeft = ChevronsLeft;
  readonly ChevronsRight = ChevronsRight;

  groupForm!: FormGroup;
  isEditMode = false;
  
  // Mock Data
  groups = [
    { id: 1, code: 'GRP001', name: 'Pathology', shortName: 'PATH', description: 'General pathology testing', displayOrder: 1, status: 'Active', createdDate: '2026-04-18' },
    { id: 2, code: 'GRP002', name: 'Biochemistry', shortName: 'BIO', description: 'Biochemical analysis and profiling', displayOrder: 2, status: 'Active', createdDate: '2026-04-18' },
    { id: 3, code: 'GRP003', name: 'Microbiology', shortName: 'MICRO', description: 'Microbiological cultures and tests', displayOrder: 3, status: 'Inactive', createdDate: '2026-04-19' },
    { id: 4, code: 'GRP004', name: 'Hematology', shortName: 'HEMA', description: 'Blood related tests and counts', displayOrder: 4, status: 'Active', createdDate: '2026-04-19' },
    { id: 5, code: 'GRP005', name: 'Serology', shortName: 'SERO', description: 'Serum based investigations', displayOrder: 5, status: 'Active', createdDate: '2026-04-20' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.groupForm = this.fb.group({
      id: [null],
      code: [{ value: this.generateCode(), disabled: true }, Validators.required],
      name: ['', [Validators.required, Validators.minLength(2)]],
      shortName: [''],
      description: [''],
      displayOrder: [this.groups.length + 1, Validators.min(1)],
      status: [true] // true for Active, false for Inactive
    });
  }

  generateCode(): string {
    return 'GRP00' + (this.groups.length + 1);
  }

  onSubmit(): void {
    if (this.groupForm.valid) {
      // In a real app, API call goes here
      const formValue = this.groupForm.getRawValue();
      const newGroup = {
        ...formValue,
        status: formValue.status ? 'Active' : 'Inactive',
        createdDate: new Date().toISOString().split('T')[0]
      };

      if (this.isEditMode) {
        const index = this.groups.findIndex(g => g.id === newGroup.id);
        if (index !== -1) {
          this.groups[index] = newGroup;
        }
      } else {
        newGroup.id = this.groups.length + 1;
        this.groups.unshift(newGroup);
      }
      
      this.resetForm();
    } else {
      this.groupForm.markAllAsTouched();
    }
  }

  editGroup(group: any): void {
    this.isEditMode = true;
    this.groupForm.patchValue({
      id: group.id,
      code: group.code,
      name: group.name,
      shortName: group.shortName,
      description: group.description,
      displayOrder: group.displayOrder,
      status: group.status === 'Active'
    });
  }

  deleteGroup(id: number): void {
    if (confirm('Are you sure you want to delete this group?')) {
      this.groups = this.groups.filter(g => g.id !== id);
    }
  }

  resetForm(): void {
    this.isEditMode = false;
    this.groupForm.reset({
      id: null,
      code: this.generateCode(),
      displayOrder: this.groups.length + 1,
      status: true
    });
  }
}
