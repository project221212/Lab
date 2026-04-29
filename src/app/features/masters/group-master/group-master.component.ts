import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Plus, Save, Edit, Trash2, X, RefreshCw, Download, Filter, ToggleLeft, ToggleRight, ListPlus, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CheckCircle, AlertCircle } from 'lucide-angular';

import { GroupMasterService } from './group-master.service';

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
  readonly CheckCircle = CheckCircle;
  readonly AlertCircle = AlertCircle;

  groupForm!: FormGroup;
  isEditMode = false;
  apiMessage = '';
  isApiSuccess = true;

  // Mock Data replaced by API data
  groups: any[] = [];

  constructor(private fb: FormBuilder, private groupService: GroupMasterService) { }

  ngOnInit(): void {
    this.initForm();
    this.loadGroups();
  }

  loadGroups(): void {

    this.groupService.getAll().subscribe({
      next: (res) => {
        const data = res?.data || res?.Data || res?.gridData || [];
        this.groups = data.map((item: any) => ({
          id: item.gCode || item.GCode || item.id,
          name: item.groupName || item.GroupName || item.name,
          shortName: item.shortName || item.ShortName || item.shortName,
          description: item.description || item.Description || item.description,
          displayOrder: item.displayOrder || item.DisplayOrder || item.displayOrder,
          IsDeleted: (item.isDeleted === 1 || item.isDeleted === true || item.IsDeleted === 1 || item.IsDeleted === true) ? '1' : '0',
          IsDeletedText: (item.isDeleted === 1 || item.isDeleted === true || item.IsDeleted === 1 || item.IsDeleted === true) ? 'InActive' : 'Active',
          createdDate: item.createdDate || item.CreatedDate || ''
        }));
      },
      error: (err) => console.error(err)
    });
  }

  initForm(): void {
    this.groupForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.minLength(2)]],
      shortName: [''],
      description: [''],
      displayOrder: [this.groups.length + 1, Validators.min(1)],
      IsDeleted: [false] // false means Active, true means InActive
    });
  }


  onSubmit(): void {
    debugger

    // Add debugging to see which fields are invalid
    Object.keys(this.groupForm.controls).forEach(key => {
      const controlErrors = this.groupForm.get(key)?.errors;
      if (controlErrors != null) {
        console.log('Invalid field:', key, controlErrors);
      }
    });

    if (this.groupForm.valid) {
      const formValue = this.groupForm.getRawValue();
      const model = {
        gCode: this.isEditMode ? formValue.id : null,
        groupName: formValue.name,
        shortName: formValue.shortName,
        description: formValue.description,
        displayOrder: formValue.displayOrder,
        IsDeleted: formValue.IsDeleted ? true : false,
        //mUser: 'Admin' // fallback user
      };
      debugger
      if (this.isEditMode) {
        this.groupService.update(model).subscribe({
          next: (res) => {
            this.showApiMessage(res?.message || res?.Message || 'Updated successfully', true);
            this.loadGroups();
            this.resetForm();
          },
          error: (err) => {
            console.error(err);
            this.showApiMessage('Failed to update record', false);
          }
        });
      } else {
        this.groupService.insert(model).subscribe({
          next: (res) => {
            this.showApiMessage(res?.message || res?.Message || 'Saved successfully', true);
            this.loadGroups();
            this.resetForm();
          },
          error: (err) => {
            console.error(err);
            this.showApiMessage('Failed to save record', false);
          }
        });
      }
    } else {
      this.groupForm.markAllAsTouched();
    }
  }

  editGroup(group: any): void {

    this.groupService.getById(group.id).subscribe({
      next: (res) => {
        const data = res?.data || res?.Data || res?.gridData || res;
        this.isEditMode = true;
        this.groupForm.patchValue({
          id: data.gCode || data.GCode || group.id,
          name: data.groupName || data.GroupName || group.name,
          shortName: data.shortName || data.ShortName || group.shortName,
          description: data.description || data.Description || group.description,
          displayOrder: data.displayOrder || data.DisplayOrder || group.displayOrder || 1,
          IsDeleted: (data.isDeleted === 1 || data.isDeleted === true || data.IsDeleted === 1 || data.IsDeleted === true) ? true : false
        });
      },
      error: (err) => console.error(err)
    });
  }

  deleteGroup(id: number): void {
    if (confirm('Are you sure you want to delete this group?')) {
      this.groupService.delete(id).subscribe({
        next: (res) => {
          this.showApiMessage(res?.message || res?.Message || 'Deleted successfully', true);
          this.loadGroups();
        },
        error: (err) => {
          console.error(err);
          this.showApiMessage('Failed to delete record', false);
        }
      });
    }
  }

  showApiMessage(message: string, isSuccess: boolean): void {
    this.apiMessage = message;
    this.isApiSuccess = isSuccess;
    setTimeout(() => {
      this.apiMessage = '';
    }, 3000);
  }

  resetForm(): void {
    this.isEditMode = false;
    this.groupForm.reset({
      id: null,
      displayOrder: this.groups.length + 1,
      IsDeleted: false
    });
  }
}
