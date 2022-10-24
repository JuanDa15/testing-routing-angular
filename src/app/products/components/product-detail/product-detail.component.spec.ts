import { Location } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { generateOneProduct } from 'src/app/models/product.mock';
import { ProductsService } from 'src/app/services/product.service';
import { ActivatedRouteStub, asyncData, asyncError, getText, mockObservable } from 'src/testing';

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
  });

  it('should create', () => {
    const productID = '12';
    route.setParamMap({'id': productID});

    const productMock = {
      ...generateOneProduct(),
      id: productID
    }

    productsService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should render the product in the view', () => {
    const productID = '12';
    route.setParamMap({'id': productID});

    const productMock = {
      ...generateOneProduct(),
      id: productID
    }

    productsService.getOne.and.returnValue(mockObservable(productMock));
    fixture.detectChanges();

    const title = getText(fixture, 'product-title');
    const price = getText(fixture, 'product-price');

    expect(productsService.getOne).toHaveBeenCalledWith(productID.toString());
    expect(title).toContain(productMock.title);
    expect(price).toContain(productMock.price.toString());
  });
  it('should return back if the product id is not sent', () => {
    // Arrange
    route.setParamMap({});
    // Act
    location.back.and.callThrough();
    fixture.detectChanges();
    // Assert
    expect(location.back).toHaveBeenCalled();
  });
  it('should go back if the product id is not valid', fakeAsync(() => {
    // Arrange
    const productID = 'wdwadesfesf';
    route.setParamMap({'id': productID});

    productsService.getOne.and.returnValue(asyncError('Product not found'));
    tick();
    fixture.detectChanges();
    location.back.and.callThrough();
    fixture.detectChanges();

    expect(location.back).toHaveBeenCalled();
  }));
  it('Should change status from "loading" to "success"', fakeAsync(() => {
    // Arrange
    const productID = '12';
    route.setParamMap({'id': productID});

    const productMock = {
      ...generateOneProduct(),
      id: productID
    }

    productsService.getOne.and.returnValue(asyncData(productMock));
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('success');
  }));
  it('Should change status from "loading" to "error"', fakeAsync(() => {
    // Arrange
    const productID = '1dfesfsefse';
    route.setParamMap({'id': productID});

    productsService.getOne.and.returnValue(asyncError('Product not found'));
    fixture.detectChanges();
    expect(component.status).toEqual('loading');
    tick();
    fixture.detectChanges();
    expect(component.status).toEqual('error');
  }));
  it('Should type be "customer"', () => {
    // Arrange
    const productID = '12';
    route.setParamMap({'id': productID});
    route.setQueryParamMap({ type: 'customer'});

    const productMock = {
      ...generateOneProduct(),
      id: productID
    }

    productsService.getOne.and.returnValue(asyncData(productMock));
    fixture.detectChanges();
    expect(component.type).toEqual('customer')
  });
});
