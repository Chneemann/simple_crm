import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import {
  Firestore,
  doc,
  onSnapshot,
  collection,
} from '@angular/fire/firestore';
import { User } from '../../models/user.class';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../../dialog/edit-user/edit-user.component';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  currentUser: User = new User();
  currentUserId!: string;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentUserId = params['id'];
      this.showUser(params['id']);
    });
  }

  showUser(userId: string) {
    onSnapshot(
      doc(collection(this.firestore, 'user'), userId),
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          this.currentUser = new User(documentSnapshot.data());
          this.currentUserId = documentSnapshot.id;
        } else {
          console.info('No such document!');
        }
      }
    );
  }

  editUserMenu() {
    const dialog = this.dialog.open(EditUserComponent);
    dialog.componentInstance.user = new User(this.currentUser.toJson());
    dialog.componentInstance.userId = this.currentUserId;
  }

  getBirthDateTime() {
    const birthDate = new Date(this.currentUser.birthDate);
    const currentDayOfMonth = birthDate.getDate().toString().padStart(2, '0');
    const currentMonth = (birthDate.getMonth() + 1).toString().padStart(2, '0');
    const currentYear = birthDate.getFullYear();

    return (
      currentMonth +
      '/' +
      currentDayOfMonth +
      '/' +
      currentYear +
      ' (MM/DD/YYYY)'
    );
  }
}
