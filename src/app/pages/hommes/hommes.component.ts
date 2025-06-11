// Importation des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// Déclaration du composant HommesComponent
@Component({
  selector: 'app-hommes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './hommes.component.html',
  styleUrls: ['./hommes.component.css']
})

// Gestion des parfums pour hommes
export class HommesComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProductsByCategory('homme').subscribe(
      products => this.products = products
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
