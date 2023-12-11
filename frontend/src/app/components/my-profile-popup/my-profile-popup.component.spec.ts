import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfilePopupComponent } from './my-profile-popup.component';

describe('MyProfilePopupComponent', () => {
  let component: MyProfilePopupComponent;
  let fixture: ComponentFixture<MyProfilePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProfilePopupComponent]
    });
    fixture = TestBed.createComponent(MyProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
