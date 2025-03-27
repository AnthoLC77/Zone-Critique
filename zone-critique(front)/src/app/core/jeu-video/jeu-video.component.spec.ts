import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JeuVideoComponent } from './jeu-video.component';

describe('JeuVideoComponent', () => {
  let component: JeuVideoComponent;
  let fixture: ComponentFixture<JeuVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JeuVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JeuVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
