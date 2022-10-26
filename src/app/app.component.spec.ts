import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { RouterLinkDirectiveStub } from 'src/testing/router-link-directive-stub';
import { queryAllByDirective } from 'src/testing';
import { RouterLink } from '@angular/router';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-banner'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class BannerComponentStub {};

@Component({
  selector: 'app-footer'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class FooterComponentStub{};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        FooterComponentStub,
        BannerComponentStub
      ],
      // schemas: [
      //   NO_ERRORS_SCHEMA
      // ]
    }).compileComponents();
  });

  beforeEach(()=> {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have 7 routerLinks', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7)
  });

  it('should have 7 routerLinks with match in routes', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLinks = links.map(link => link.injector.get(RouterLinkDirectiveStub));

    expect(routerLinks[0].linkParams).toEqual('/');
    expect(routerLinks[1].linkParams).toEqual('/auth/register');
  });
});
