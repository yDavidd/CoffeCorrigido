import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../model/service/product.service';
import { CommonModule } from '@angular/common';
import { Iproduct } from '../../model/service/iproduct';
import { HttpClientModule } from '@angular/common/http';
import { StarRatingDirective } from '../Diretivas/star-rating.directive';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, StarRatingDirective],
  providers: [ProductService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  products: Iproduct[] = [];
  filteredProducts: Iproduct[] = [];


  selectedButton: string = 'featured';

  constructor(private productService: ProductService) {
    this.loadProducts(this.selectedButton); //Carregar produtos ao inicializar o componente
  }

  loadProducts(selectedButton: string): void{
    this.productService.getProducts().subscribe(
      (data: Iproduct[]) => {
        this.products = data; //Atualiza os produtos com os dados recebido
        if (selectedButton === 'featured'){
          this.filteredProducts = this.products;
        } else {
          this.filteredProducts =
          this.products.filter(product => product.filter === selectedButton)
        }
        this.selectedButton = selectedButton;
      },
      (error) => {
        console.error('Erro ao carregar os produtos:', error);
      }
    );
  }


}
