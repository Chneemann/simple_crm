import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, collection, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    MatProgressBarModule,
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class EditUserComponent {
  loading = false;
  birthDate!: Date;
  user!: User;
  userId!: string;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) {}

  saveUser() {
    this.loading = true;
    this.updateUser(this.userId);
  }

  async updateUser(userId: string) {
    await updateDoc(
      doc(collection(this.firestore, 'user'), userId),
      this.getCleanJson(this.user)
    ).catch((err) => {
      console.error(err);
    });
  }

  getCleanJson(user: User): {} {
    if (this.birthDate) {
      this.user.birthDate = this.birthDate.getTime();
    }
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      mail: user.mail,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city,
    };
  }

  dialogClose(): void {
    this.dialogRef.close();
  }

  getBirthDateTime() {
    const birthDate = new Date(this.user.birthDate);
    const currentDayOfMonth = birthDate.getDate();
    const currentMonth = birthDate.getMonth() + 1;
    const currentYear = birthDate.getFullYear();

    return currentMonth + '/' + currentDayOfMonth + '/' + currentYear;
  }
}
