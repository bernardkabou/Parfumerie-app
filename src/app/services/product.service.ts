import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'homme' | 'femme';
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    // Parfums Femmes
    {
      id: 1,
      name: 'BK Divine Élégance',
      price: 89.99,
      image: '/assets/F1.png',
      description: 'Un parfum floral délicat aux notes de jasmin et de rose',
      category: 'femme'
    },
    {
      id: 2,
      name: 'BK Rose Enchantée',
      price: 94.99,
      image: '/assets/F2.png',
      description: 'Une fragrance florale à la rose et à la pivoine',
      category: 'femme'
    },
    {
      id: 3,
      name: 'BK Fraîcheur Matinale',
      price: 79.99,
      image: '/assets/F3.png',
      description: 'Notes fraîches et agrumes pour une sensation de pureté',
      category: 'femme'
    },
    {
      id: 4,
      name: 'BK Oriental Dream',
      price: 99.99,
      image: '/assets/F4.png',
      description: 'Une composition orientale envoûtante aux notes de vanille et de musc',
      category: 'femme'
    },
    {
      id: 5,
      name: 'BK Velours',
      price: 85.99,
      image: '/assets/F5.png',
      description: 'Un parfum velouté aux notes de vanille et de patchouli',
      category: 'femme'
    },
    {
      id: 6,
      name: 'BK Nuit Mystère',
      price: 92.99,
      image: '/assets/F6.png',
      description: 'Une fragrance mystérieuse pour les soirées avec des notes boisées',
      category: 'femme'
    },
    {
      id: 7,
      name: 'BK Jardin Secret',
      price: 88.99,
      image: '/assets/F7.png',
      description: 'Notes florales et fruitées d\'un jardin secret',
      category: 'femme'
    },
    {
      id: 8,
      name: 'BK Élégance',
      price: 95.99,
      image: '/assets/F8.png',
      description: 'L\'élégance à l\'état pur avec des notes de fleurs blanches',
      category: 'femme'
    },
    {
      id: 9,
      name: 'BK Fleurs de Nuit',
      price: 89.99,
      image: '/assets/F9.png',
      description: 'Un bouquet floral nocturne avec des notes de jasmin',
      category: 'femme'
    },
    {
      id: 10,
      name: 'BK Douceur',
      price: 79.99,
      image: '/assets/F10.png',
      description: 'Une fragrance douce et poudrée aux notes d\'iris',
      category: 'femme'
    },
    {
      id: 11,
      name: 'BK Passion',
      price: 99.99,
      image: '/assets/F11.png',
      description: 'Un parfum passionné aux notes de rose et de patchouli',
      category: 'femme'
    },
    {
      id: 12,
      name: 'BK Romance',
      price: 94.99,
      image: '/assets/F12.png',
      description: 'Une fragrance romantique aux notes florales et musquées',
      category: 'femme'
    },

    // Parfums Hommes
    {
      id: 13,
      name: 'BK Bois Intense',
      price: 84.99,
      image: '/assets/H1.png',
      description: 'Un parfum boisé intense aux notes de cèdre et de santal',
      category: 'homme'
    },
    {
      id: 14,
      name: 'BK Sport Fresh',
      price: 79.99,
      image: '/assets/H2.png',
      description: 'Une fragrance fraîche et dynamique avec des notes d\'agrumes',
      category: 'homme'
    },
    {
      id: 15,
      name: 'BK Élégance',
      price: 89.99,
      image: '/assets/H4.png',
      description: 'Un parfum raffiné aux notes épicées et boisées',
      category: 'homme'
    },
    {
      id: 16,
      name: 'BK Ocean Blue',
      price: 74.99,
      image: '/assets/H5.png',
      description: 'Une fragrance marine vivifiante aux notes aquatiques',
      category: 'homme'
    },
    {
      id: 17,
      name: 'BK Aventure',
      price: 82.99,
      image: '/assets/H6.png',
      description: 'Pour l\'homme aventurier avec des notes vertes et boisées',
      category: 'homme'
    },
    {
      id: 18,
      name: 'BK Urban Style',
      price: 87.99,
      image: '/assets/H7.png',
      description: 'Le parfum de l\'homme urbain aux notes modernes et épicées',
      category: 'homme'
    },
    {
      id: 19,
      name: 'BK Night Code',
      price: 93.99,
      image: '/assets/H8.png',
      description: 'Une fragrance mystérieuse pour la nuit avec des notes orientales',
      category: 'homme'
    },
    {
      id: 20,
      name: 'BK Business',
      price: 96.99,
      image: '/assets/H9.png',
      description: 'L\'élégance professionnelle avec des notes boisées raffinées',
      category: 'homme'
    },
    {
      id: 21,
      name: 'BK Gentleman',
      price: 89.99,
      image: '/assets/H10.png',
      description: 'Un parfum sophistiqué pour le gentleman moderne',
      category: 'homme'
    },
    {
      id: 22,
      name: 'BK Power',
      price: 92.99,
      image: '/assets/H11.png',
      description: 'Une fragrance puissante aux notes ambrées et musquées',
      category: 'homme'
    },
    {
      id: 23,
      name: 'BK Classic',
      price: 88.99,
      image: '/assets/H12.png',
      description: 'Un classique intemporel aux notes boisées et épicées',
      category: 'homme'
    }
  ];

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductsByCategory(category: 'homme' | 'femme'): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}
