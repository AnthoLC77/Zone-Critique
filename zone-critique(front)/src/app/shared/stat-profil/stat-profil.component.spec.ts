import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatProfilComponent } from './stat-profil.component';

describe('StatProfilComponent', () => {
  let component: StatProfilComponent;
  let fixture: ComponentFixture<StatProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatProfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
