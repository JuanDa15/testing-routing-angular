import { Component, NO_ERRORS_SCHEMA } from "@angular/core";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { Router, RouterLinkWithHref } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { clickElement, clickEvent, getText, mockObservable, query, queryAllByDirective, queryById } from "src/testing";
import { AppComponent } from "./app.component";
import { routes } from "./app-routing.module";
import { AppModule } from "./app.module";
import { ProductsService } from "./services/product.service";
import { generateManyProducts } from "./models/product.mock";
import { AuthService } from "./services/auth.service";
import { generateOneUser } from "./models/user.mock";

// @Component({
//   selector: 'app-pico-preview'
// })
// // eslint-disable-next-line @angular-eslint/component-class-suffix
// class PicoPreviewComponent{};

// @Component({
//   selector: 'app-people'
// })
// // eslint-disable-next-line @angular-eslint/component-class-suffix
// class PeopleComponent{};

// @Component({
//   selector: 'app-people'
// })
// // eslint-disable-next-line @angular-eslint/component-class-suffix
// class OthersComponent{};

// const fakeRoutes = [
//   {
//     path: 'pico-preview',
//     component: PicoPreviewComponent
//   },
//   {
//     path: 'people',
//     component: PeopleComponent
//   },
//   {
//     path: 'others',
//     component: OthersComponent
//   }
// ]

describe('app integration test', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let productsService: jasmine.SpyObj<ProductsService>;
  let authService: jasmine.SpyObj<AuthService>;
  beforeEach(async () => {
    const spyProductService = jasmine.createSpyObj('ProductsService', ['getAll']);
    const spyAuthService = jasmine.createSpyObj('AuthService',['getUser']);
    await TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule.withRoutes(fakeRoutes),
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        // AppComponent,
        // PeopleComponent,
        // OthersComponent,
        // PicoPreviewComponent
      ],
      providers: [
        { provide: ProductsService, useValue: spyProductService },
        { provide: AuthService, useValue: spyAuthService }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  });

  beforeEach(fakeAsync(()=> {
    fixture = TestBed.createComponent(AppComponent);
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    component = fixture.componentInstance;
    fixture.detectChanges();
    // PROVIDERS
    router = TestBed.inject(Router);
    router.initialNavigation();

    tick(); //Wait until the navigation ends
    fixture.detectChanges();
  }))

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(7)
  });

  it('should render others component when clicked other link with user', fakeAsync(() => {
    const user = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(user));
    clickElement(fixture, 'others-link', true);
    tick();
    productsService.getAll.and.returnValue(mockObservable(generateManyProducts(10)));
    tick();
    fixture.detectChanges();
    const text = getText(fixture, 'products-length');
    expect(authService.getUser).toHaveBeenCalled();
    expect(router.url).toContain('others');
    expect(fixture.debugElement.query(By.css('app-others'))).toBeTruthy();
    expect(text).toContain(10);
  }));
  it('should not render others', fakeAsync(() => {
    const user = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(null));
    clickElement(fixture, 'others-link', true);
    tick();
    fixture.detectChanges();
    expect(authService.getUser).toHaveBeenCalled();
    expect(router.url).toEqual('/');
  }));
  it('should render others component when clicked people link', fakeAsync(() => {
    clickElement(fixture, 'people-link', true);
    tick();
    fixture.detectChanges();

    expect(router.url).toContain('people');
    expect(fixture.debugElement.query(By.css('app-people')));
  }));
});
