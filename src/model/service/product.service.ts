import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";
import { localProducts } from "../data/mock-products";
import { Iproduct } from "./iproduct";


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/produto';

  products:Iproduct[] = localProducts;

  constructor(private http: HttpClient) { }

  //Método para obter todos os produtos da API
  getProducts(): Observable<Iproduct[]>{
    return this.http.get<Iproduct[]>(this.apiUrl).pipe(
      //Em caso de erro, usa o array local
      catchError(error => {
        console.error('Erro ao buscar produtos da API, usando produtos locais:', error);
        return of(this.products); // Retorna o array local como Observable
        })
    );
  }

   // Método para obter um produto por ID da API
   getProductById(id: number): Observable<Iproduct> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Iproduct>(url);
  }

  // Método para adicionar um novo produto à API
  addProduct(newProduct: Iproduct): Observable<Iproduct> {
    return this.http.post<Iproduct>(this.apiUrl, newProduct);
  }

  // Método para atualizar um produto existente na API
  updateProduct(updatedProduct: Iproduct): Observable<Iproduct> {
    const url = `${this.apiUrl}/${updatedProduct.id}`;
    return this.http.put<Iproduct>(url, updatedProduct);
  }

  // Método para deletar um produto por ID na API
  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
