// Importation des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

// Déclaration du composant AccueilComponent
@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

// Gestion des produits et du carrousel
export class AccueilComponent implements OnInit {
  currentImage = '/assets/P1.png';
  imageIndex = 0;
  
  // Images du carrousel
  images = [
    '/assets/P1.png',
    '/assets/P2.png',
    '/assets/P3.png',
    '/assets/P4.png',
    '/assets/P5.png',
    '/assets/P6.png',
    '/assets/P7.png',
  ];

  // Définition des produits par section
  newProducts: Product[] = [
    {
      id: 101,
      name: 'Bulle Kinetik',
      price: 89.99,
      image: '/assets/N1.png',
      description: 'Une fragrance intense et raffinée'
    },
    {
      id: 102,
      name: 'BK Élixir',
      price: 92.99,
      image: '/assets/N2.png',
      description: 'Une fragrance florale et élégante'
    },
    {
      id: 103,
      name: 'Baroque Karma',
      price: 85.99,
      image: '/assets/N3.png',
      description: 'Un parfum audacieux et séduisant'
    },
    {
      id: 104,
      name: 'Berlin Karmesin',
      price: 88.99,
      image: '/assets/N4.png',
      description: 'Un parfum divin et envoûtant'
    }
  ];

  trendingProducts: Product[] = [
    {
      id: 201,
      name: 'BK Intense',
      price: 95.99,
      image: '/assets/T1.png',
      description: 'Une fragrance mystérieuse'
    },
    {
      id: 202,
      name: 'Bois Kora',
      price: 92.99,
      image: '/assets/T2.png',
      description: 'Le parfum du succès'
    },
    {
      id: 203,
      name: 'Black Kingdom',
      price: 97.99,
      image: '/assets/T3.png',
      description: "L'élégance parisienne"
    },
    {
      id: 204,
      name: 'Brume Karmique',
      price: 94.99,
      image: '/assets/T4.png',
      description: 'La sensualité masculine réinventée'
    }
  ];

  bestSellers: Product[] = [
    {
      id: 301,
      name: 'Bleu Kaolin',
      price: 102.99,
      image: '/assets/M1.png',
      description: "L'essence de l'élégance masculine"
    },
    {
      id: 302,
      name: 'Bois & Kaviar',
      price: 98.99,
      image: '/assets/M2.png',
      description: 'Un parfum sophistiqué et moderne'
    }
  ];

  constructor(private cartService: CartService) {}

  ngOnInit() {
  }

  // Navigation dans le carrousel
  prevSlide(): void {
    this.imageIndex--;
    if (this.imageIndex < 0) {
      this.imageIndex = this.images.length - 1;
    }
    this.currentImage = this.images[this.imageIndex];
  }

  nextSlide(): void {
    this.imageIndex++;
    if (this.imageIndex >= this.images.length) {
      this.imageIndex = 0;
    }
    this.currentImage = this.images[this.imageIndex];
  }

  // Ajouter au panier
  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}