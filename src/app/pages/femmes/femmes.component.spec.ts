// Importation des modules nécessaires
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FemmesComponent } from './femmes.component';

// Définition du groupe de tests pour le composant FemmesComponent
describe('HommesComponent', () => {
  let component: FemmesComponent;
  let fixture: ComponentFixture<FemmesComponent>;

  // Configuration du module de test avant chaque test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FemmesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FemmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
