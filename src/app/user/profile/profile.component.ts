import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileService, UserProfile, Order, Address, Preferences } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    CurrencyPipe
  ]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  orders: Order[] = [];
  addresses: Address[] = [];
  preferences: Preferences = {
    newsletter: true,
    notifications: true
  };

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(profile => {
      this.userProfile = profile;
    });

    this.profileService.getOrders().subscribe(orders => {
      this.orders = orders;
    });

    this.profileService.getAddresses().subscribe(addresses => {
      this.addresses = addresses;
    });

    this.profileService.getPreferences().subscribe(preferences => {
      this.preferences = preferences;
    });
  }

  updatePreferences() {
    this.profileService.updatePreferences(this.preferences);
  }

  addAddress(address: Address) {
    this.profileService.addAddress(address);
  }

  deleteAddress(index: number) {
    this.profileService.deleteAddress(index);
  }
}
