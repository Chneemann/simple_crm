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
  user!: User;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<EditUserComponent>
  ) {}

  saveUser() {
    this.loading = true;
    this.updateUser(this.user.id);
  }

  async updateUser(userId: string) {
    await updateDoc(doc(this.firestore, 'user', userId), {}).catch((err) => {
      console.error(err);
    });
    this.loading = false;
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
