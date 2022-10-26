import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/product.service';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit{

  color = 'yellow';
  text = 'Un texto';
  products: Product[] = []

  constructor(
    private _productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this._productsService.getAll()
    .subscribe({
      next: (data) => {
        this.products = data;
      }
    })
  }

}
