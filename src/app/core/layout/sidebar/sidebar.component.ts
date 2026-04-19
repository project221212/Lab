import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, LayoutDashboard, Users, TestTubes, Receipt, FileText, Settings, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
  readonly TestTubes = TestTubes;
  readonly Receipt = Receipt;
  readonly FileText = FileText;
  readonly Settings = Settings;
  readonly LogOut = LogOut;

  navItems = [
    { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { label: 'Patients', route: '/patients', icon: Users },
    { label: 'Tests', route: '/tests', icon: TestTubes },
    { label: 'Billing', route: '/billing', icon: Receipt },
    { label: 'Reports', route: '/reports', icon: FileText },
    { label: 'Settings', route: '/settings', icon: Settings },
  ];
}
