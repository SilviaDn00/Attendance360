import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StampingDetailsComponent } from './stamping-details.component';

describe('StampingDetailsComponent', () => {
  let component: StampingDetailsComponent;
  let fixture: ComponentFixture<StampingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StampingDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StampingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
