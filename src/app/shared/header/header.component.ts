import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit { 
  isAuthenticated = false;
  userName: string | null = null;
  itemCount = 0;

  constructor(private authService: AuthService, private cartService: CartService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(
      isAuth => this.isAuthenticated = isAuth
    );

    this.authService.getCurrentUser().subscribe(
      user => this.userName = user?.name ?? null
    );

    this.cartService.getCartItems().subscribe(items => {
      this.itemCount = items.reduce((count, item) => count + item.quantity, 0);
    });
  }

  logout() {
    this.authService.logout();
  }
}