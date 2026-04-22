import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Users, FileClock, TestTube2, IndianRupee, ArrowUpRight, ArrowDownRight, Plus } from 'lucide-angular';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit {
  readonly Users = Users;
  readonly FileClock = FileClock;
  readonly TestTube2 = TestTube2;
  readonly IndianRupee = IndianRupee;
  readonly ArrowUpRight = ArrowUpRight;
  readonly ArrowDownRight = ArrowDownRight;
  readonly Plus = Plus;

  @ViewChild('revenueChart') revenueChart!: ElementRef;

  stats = [
    { label: 'Total Patients', value: '12,450', trend: '+12.5%', isUp: true, icon: Users, color: 'text-sky-700', bg: 'bg-sky-100' },
    { label: 'Today\'s Tests', value: '145', trend: '+5.2%', isUp: true, icon: TestTube2, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Pending Reports', value: '28', trend: '-2.4%', isUp: false, icon: FileClock, color: 'text-orange-600', bg: 'bg-orange-100' },
    { label: 'Total Revenue', value: '₹45,230', trend: '+8.1%', isUp: true, icon: IndianRupee, color: 'text-teal-600', bg: 'bg-teal-100' },
  ];

  recentPatients = [
    { id: 'PT-1042', name: 'Rahul Sharma', age: 45, gender: 'M', test: 'Complete Blood Count', status: 'Pending', time: '10:30 AM' },
    { id: 'PT-1041', name: 'Priya Patel', age: 32, gender: 'F', test: 'Thyroid Profile', status: 'Completed', time: '09:45 AM' },
    { id: 'PT-1040', name: 'Amit Kumar', age: 28, gender: 'M', test: 'Lipid Profile', status: 'Completed', time: '09:15 AM' },
    { id: 'PT-1039', name: 'Sneha Gupta', age: 54, gender: 'F', test: 'HbA1c', status: 'Processing', time: '08:50 AM' },
  ];

  ngAfterViewInit() {
    new Chart(this.revenueChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Revenue (₹)',
          data: [12000, 19000, 15000, 22000, 18000, 28000, 25000],
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37, 99, 235, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: '#e2e8f0' }
          },
          x: {
            grid: { display: false }
          }
        }
      }
    });
  }
}
