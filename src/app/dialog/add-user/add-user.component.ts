import { Component, Inject } from '@angular/core';
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
import { DialogData, UserComponent } from '../../user/user.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddUserComponent {
  user = new User();
  birthDate!: Date;

  constructor(
    public dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log(this.user);
  }
}
