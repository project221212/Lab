import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, UserPlus, Save, X, History } from 'lucide-angular';

@Component({
  selector: 'app-patient-registration',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './patient-registration.component.html',
  styleUrl: './patient-registration.component.scss',
})
export class PatientRegistrationComponent {
  readonly UserPlus = UserPlus;
  readonly Save = Save;
  readonly X = X;
  readonly History = History;

  generatedId = 'PT-' + Math.floor(10000 + Math.random() * 90000);
}
