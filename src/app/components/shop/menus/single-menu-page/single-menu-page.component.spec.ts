import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleMenuPageComponent } from './single-menu-page.component';

describe('SingleMenuPageComponent', () => {
  let component: SingleMenuPageComponent;
  let fixture: ComponentFixture<SingleMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleMenuPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
