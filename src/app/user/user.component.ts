import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { AddUserComponent } from '../dialog/add-user/add-user.component';
import { User } from '../models/user.class';
import { Firestore, onSnapshot, collection } from '@angular/fire/firestore';

export interface DialogData {}

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user = new User();
  allUsers: any[] = [];

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit() {
    this.updateAllUsers();
  }

  updateAllUsers() {
    onSnapshot(collection(this.firestore, 'user'), (list) => {
      if (!list.empty) {
        this.allUsers = [];
        list.forEach((doc) => {
          const userData = doc.data();
          userData['id'] = doc.id;
          this.allUsers.push(userData);
        });
      } else {
        console.info('No such document!');
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
