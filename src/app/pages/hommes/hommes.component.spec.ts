// Importation des modules nécessaires
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HommesComponent } from './hommes.component';

// Définition du groupe de tests pour le composant HommesComponent
describe('HommesComponent', () => {
  let component: HommesComponent;
  let fixture: ComponentFixture<HommesComponent>;

  // Configuration du module de test avant chaque test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HommesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HommesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
