import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackroundAnimateThreeComponent } from './backround-animate-three.component';

describe('BackroundAnimateThreeComponent', () => {
  let component: BackroundAnimateThreeComponent;
  let fixture: ComponentFixture<BackroundAnimateThreeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BackroundAnimateThreeComponent]
    });
    fixture = TestBed.createComponent(BackroundAnimateThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
