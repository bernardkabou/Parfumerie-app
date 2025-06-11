import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="catalog-container">
      <div class="products-grid">
        <div *ngFor="let product of products" class="product-card">
          <img [src]="product.image" [alt]="product.name" class="product-image">
          <div class="product-info">
            <h3>{{product.name}}</h3>
            <p class="description">{{product.description}}</p>
            <p class="price">{{product.price | currency:'EUR'}}</p>
            <button class="add-to-cart" (click)="addToCart(product)">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .catalog-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 2rem;
    }

    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
      background: white;
      transition: transform 0.2s;
    }

    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .product-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .product-info {
      padding: 1rem;
    }

    .product-info h3 {
      margin: 0 0 0.5rem 0;
      color: #333;
    }

    .description {
      color: #666;
      margin-bottom: 1rem;
    }

    .price {
      font-weight: bold;
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .add-to-cart {
      width: 100%;
      padding: 0.75rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .add-to-cart:hover {
      background: #27ae60;
    }
  `]
})
export class ProductCatalogComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
