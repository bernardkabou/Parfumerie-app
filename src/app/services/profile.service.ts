import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
}

export interface Order {
  id: number;
  date: Date;
  status: string;
  items: OrderItem[];
  total: number;
}

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Address {
  type: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Preferences {
  newsletter: boolean;
  notifications: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/users';
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  private ordersSubject = new BehaviorSubject<Order[]>([]);
  private addressesSubject = new BehaviorSubject<Address[]>([]);
  private preferencesSubject = new BehaviorSubject<Preferences>({
    newsletter: false,
    notifications: true
  });
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loadUserData();
  }

  private loadUserData() {
    if (!this.isBrowser) {
      return; // Ne pas charger les données si on est côté serveur
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    // Charger le profil utilisateur
    this.fetchUserProfile();
    this.fetchOrders();
    this.fetchAddresses();
    this.fetchPreferences();
  }

  private fetchUserProfile() {
    this.http.get<UserProfile>(`${this.apiUrl}/profile`).pipe(
      catchError(error => {
        console.error('Error fetching user profile:', error);
        return of(null);
      })
    ).subscribe(
      profile => this.userProfileSubject.next(profile)
    );
  }

  private fetchOrders() {
    this.http.get<Order[]>(`${this.apiUrl}/orders`).pipe(
      catchError(error => {
        console.error('Error fetching orders:', error);
        return of([]);
      })
    ).subscribe(
      orders => this.ordersSubject.next(orders)
    );
  }

  private fetchAddresses() {
    this.http.get<Address[]>(`${this.apiUrl}/addresses`).pipe(
      catchError(error => {
        console.error('Error fetching addresses:', error);
        return of([]);
      })
    ).subscribe(
      addresses => this.addressesSubject.next(addresses)
    );
  }

  private fetchPreferences() {
    this.http.get<Preferences>(`${this.apiUrl}/preferences`).pipe(
      catchError(error => {
        console.error('Error fetching preferences:', error);
        return of({ newsletter: false, notifications: true });
      })
    ).subscribe(
      preferences => this.preferencesSubject.next(preferences)
    );
  }

  getUserProfile(): Observable<UserProfile | null> {
    return this.userProfileSubject.asObservable();
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

  getAddresses(): Observable<Address[]> {
    return this.addressesSubject.asObservable();
  }

  getPreferences(): Observable<Preferences> {
    return this.preferencesSubject.asObservable();
  }

  updateProfile(profile: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/profile`, profile).pipe(
      tap(updatedProfile => this.userProfileSubject.next(updatedProfile))
    );
  }

  updatePreferences(preferences: Preferences): Observable<Preferences> {
    return this.http.put<Preferences>(`${this.apiUrl}/preferences`, preferences).pipe(
      tap(updatedPreferences => this.preferencesSubject.next(updatedPreferences))
    );
  }

  addAddress(address: Address): Observable<Address[]> {
    return this.http.post<Address[]>(`${this.apiUrl}/addresses`, address).pipe(
      tap(addresses => this.addressesSubject.next(addresses))
    );
  }

  deleteAddress(index: number): Observable<Address[]> {
    return this.http.delete<Address[]>(`${this.apiUrl}/addresses/${index}`).pipe(
      tap(addresses => this.addressesSubject.next(addresses))
    );
  }

  updateAvatar(file: File): Observable<UserProfile> {
    const formData = new FormData();
    formData.append('avatar', file);

    return this.http.put<UserProfile>(`${this.apiUrl}/profile/avatar`, formData).pipe(
      tap(updatedProfile => this.userProfileSubject.next(updatedProfile))
    );
  }

  refreshUserData(): void {
    this.loadUserData();
  }
}
