import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireAndForgetManagerComponent } from './fire-and-forget-manager.component';

describe('FireAndForgetManagerComponent', () => {
  let component: FireAndForgetManagerComponent;
  let fixture: ComponentFixture<FireAndForgetManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FireAndForgetManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireAndForgetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
