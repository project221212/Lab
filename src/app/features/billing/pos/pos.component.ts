import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Search, Trash2, IndianRupee, Printer, FileCheck } from 'lucide-angular';

@Component({
  selector: 'app-pos',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pos.component.html',
})
export class PosComponent {
  readonly Search = Search;
  readonly Trash2 = Trash2;
  readonly IndianRupee = IndianRupee;
  readonly Printer = Printer;
  readonly FileCheck = FileCheck;

  billItems = [
    { id: 'TST-001', name: 'Complete Blood Count (CBC)', price: 450 },
    { id: 'TST-003', name: 'Thyroid Profile (T3, T4, TSH)', price: 1200 },
  ];

  subtotal = 1650;
  discount = 150;
  gst = Math.round((1650 - 150) * 0.18); // 18% GST
  total = this.subtotal - this.discount + this.gst;
}
