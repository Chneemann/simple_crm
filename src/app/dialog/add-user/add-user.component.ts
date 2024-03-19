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
import { DialogData, UserComponent } from '../../user/user.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';
@Component({
  selector: 'app-add-user',
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
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddUserComponent {
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(
    private firestore: Firestore,
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    this.addNewUser();
  }

  async addNewUser() {
    await addDoc(collection(this.firestore, 'user'), this.user.toJson())
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
      });
    this.loading = false;
  }
}
