import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import {
  Firestore,
  doc,
  onSnapshot,
  collection,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  constructor(private firestore: Firestore, private route: ActivatedRoute) {}

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
          console.log(documentSnapshot.data());
        } else {
          console.info('No such document!');
        }
      }
    );
  }
}
