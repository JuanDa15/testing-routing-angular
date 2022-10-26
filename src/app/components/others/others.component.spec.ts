import { ComponentFixture, TestBed } from '@angular/core/testing';
import { generateManyProducts } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ReversePipe } from 'src/app/shared/pipes/reverse.pipe';
import { mockObservable } from 'src/testing';

import { OthersComponent } from './others.component';

xdescribe('OthersComponent', () => {
  let component: OthersComponent;
  let fixture: ComponentFixture<OthersComponent>;
  let productsService: jasmine.SpyObj<ProductsService>;
  beforeEach(async () => {
    const spyProductService = jasmine.createSpyObj('ProductsService', ['getAll']);
    await TestBed.configureTestingModule({
      declarations: [ OthersComponent, ReversePipe ],
      providers: [
        { provide: ProductsService, useValue: spyProductService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersComponent);
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    productsService.getAll.and.returnValue(mockObservable(generateManyProducts(10)));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
