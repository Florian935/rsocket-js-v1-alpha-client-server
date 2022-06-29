import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestChannelComponent } from './request-channel.component';

describe('RequestChannelComponent', () => {
  let component: RequestChannelComponent;
  let fixture: ComponentFixture<RequestChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
