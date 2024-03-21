import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  Firestore,
  doc,
  onSnapshot,
  collection,
} from '@angular/fire/firestore';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

  currentUser: User = new User();

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const userId = params['id'];
      this.showUser(userId);
    });
  }

  showUser(userId: string) {
    onSnapshot(
      doc(collection(this.firestore, 'user'), userId),
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          this.currentUser = new User(documentSnapshot.data());
        } else {
          console.info('No such document!');
        }
      }
    );
  }

  openAdressDialog() {}

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
