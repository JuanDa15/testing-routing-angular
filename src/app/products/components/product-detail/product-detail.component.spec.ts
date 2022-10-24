import { Location } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { generateOneProduct } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRouteStub, mockObservable } from 'src/testing';

import { ProductDetailComponent } from './product-detail.component';

fdescribe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productsService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    const productSpy = jasmine.createSpyObj('ProductsService',['getOne']);
    const locationSpy = jasmine.createSpyObj('Location',['back']);

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductsService, useValue: productSpy },
        { provide: Location, useValue: locationSpy}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    component = fixture.componentInstance;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    location = <jasmine.SpyObj<Location>>TestBed.inject(Location);

    const productID = '12';
    route.setParamMap({'id': productID});

    const productMock = {
      ...generateOneProduct(),
      id: productID
    }

    productsService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
