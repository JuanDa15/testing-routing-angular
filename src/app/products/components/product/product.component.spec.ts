import { ComponentFixture, TestBed } from '@angular/core/testing';
import { generateOneProduct } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';

import { ProductComponent } from './product.component';

xdescribe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const product = generateOneProduct();
    component.product = product;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
