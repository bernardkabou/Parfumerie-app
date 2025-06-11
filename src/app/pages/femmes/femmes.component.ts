// Importation des modules nécessaires
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

// Déclaration du composant FemmesComponent
@Component({
  selector: 'app-femmes',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './femmes.component.html',
  styleUrls: ['./femmes.component.css']
})

// Gestion des parfums pour femmes
export class FemmesComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProductsByCategory('femme').subscribe(
      products => this.products = products
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
