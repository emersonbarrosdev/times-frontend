import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { IUser } from '../../../shared/interfaces/iuser';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatButtonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  currentUser!: IUser;
  cards: any[] = [];

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe((user) => {
      this.currentUser = user!;
      this.setCards();
    });
  }

  private setCards() {
    if (!this.currentUser) {
      this.cards = [];
      return;
    }

    switch (this.currentUser.role) {
      case 'ADMIN':
        this.cards = [1, 2, 3, 4, 5];
        break;
      case 'MANAGER':
        this.cards = [1, 2, 3];
        break;
      default:
        this.cards = [1];
        break;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
