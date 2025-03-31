import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeDessineeComponent } from './bande-dessinee.component';

describe('BandeDessineeComponent', () => {
  let component: BandeDessineeComponent;
  let fixture: ComponentFixture<BandeDessineeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandeDessineeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandeDessineeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
