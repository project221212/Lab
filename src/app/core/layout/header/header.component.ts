import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Bell, Search, User, TestTubes, LayoutDashboard, Users, Receipt, FileText, Settings, LogOut } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly Bell = Bell;
  readonly Search = Search;
  readonly User = User;
  readonly TestTubes = TestTubes;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Users = Users;
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
