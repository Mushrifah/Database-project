import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { ToastComponent } from '../shared/toast/toast.component';
import { CarService } from '../services/car.service';
import { CarsComponent } from './cars.component';
import { of, Observable } from 'rxjs';

class CarServiceMock {
  mockCars = [
    { carname: 'Car 1', name: 'mush', bookdate:'22-04-2021' },
    { carname: 'Car 2', name: 'anam', bookdate:'23-04-2021' },
  ];
  getCars(): Observable<object[]> {
    return of(this.mockCars);
  }
}

describe('Component: Cars', () => {
  let component: CarsComponent;
  let fixture: ComponentFixture<CarsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ CarsComponent ],
      providers: [
        ToastComponent, FormBuilder,
        { provide: CarService, useClass: CarServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the page header text', () => {
    const el = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(el.textContent).toContain('Current cars (2)');
  });

  it('should display the text for no cars', () => {
    component.cars = [];
    fixture.detectChanges();
    const headerEl = fixture.debugElement.query(By.css('h4')).nativeElement;
    expect(headerEl.textContent).toContain('Current cars (0)');
    const tdEl = fixture.debugElement.query(By.css('td')).nativeElement;
    expect(tdEl.textContent).toContain('There are no cars in the DB. Add a new car details below.');
  });

  it('should display current cars', () => {
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(8);
    expect(tds[0].nativeElement.textContent).toContain('Car 1');
    expect(tds[1].nativeElement.textContent).toContain('1');
    expect(tds[2].nativeElement.textContent).toContain('2');
    expect(tds[4].nativeElement.textContent).toContain('Car 2');
    expect(tds[5].nativeElement.textContent).toContain('3');
    expect(tds[6].nativeElement.textContent).toContain('4.2');
  });

  it('should display the edit and delete buttons', () => {
    const [btnEdit1, btnDelete1, btnEdit2, btnDelete2] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnEdit1.nativeElement).toBeTruthy();
    expect(btnEdit1.nativeElement.textContent).toContain('Edit');
    expect(btnDelete1.nativeElement).toBeTruthy();
    expect(btnDelete1.nativeElement.textContent).toContain('Delete');
    expect(btnEdit2.nativeElement).toBeTruthy();
    expect(btnEdit2.nativeElement.textContent).toContain('Edit');
    expect(btnDelete2.nativeElement).toBeTruthy();
    expect(btnDelete2.nativeElement.textContent).toContain('Delete');
  });

  it('should display the edit form', async () => {
    component.isEditing = true;
    component.car = { carname: 'Car 1', name: 'mush', bookdate: '22-04-2021' };
    fixture.detectChanges();
    await fixture.whenStable();
    const tds = fixture.debugElement.queryAll(By.css('td'));
    expect(tds.length).toBe(1);
    const formEl = fixture.debugElement.query(By.css('form')).nativeElement;
    expect(formEl).toBeTruthy();
    const [inputName, inputAge, inputWeight] = fixture.debugElement.queryAll(By.css('input'));
    expect(inputName.nativeElement.value).toContain('Car 1');
    expect(inputAge.nativeElement.value).toContain('1');
    expect(inputWeight.nativeElement.value).toContain('2');
    const [btnSave, btnCancel] = fixture.debugElement.queryAll(By.css('button'));
    expect(btnSave.nativeElement).toBeTruthy();
    expect(btnSave.nativeElement.textContent).toContain('Save');
    expect(btnCancel.nativeElement).toBeTruthy();
    expect(btnCancel.nativeElement.textContent).toContain('Cancel');
  });

});
