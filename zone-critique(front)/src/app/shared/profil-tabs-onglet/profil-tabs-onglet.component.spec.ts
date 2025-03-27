import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilTabsOngletComponent } from './profil-tabs-onglet.component';

describe('ProfilTabsOngletComponent', () => {
  let component: ProfilTabsOngletComponent;
  let fixture: ComponentFixture<ProfilTabsOngletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilTabsOngletComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilTabsOngletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
