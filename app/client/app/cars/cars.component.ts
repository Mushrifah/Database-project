import { Component, OnInit } from '@angular/core';

import { CarService } from '../services/car.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.scss']
})
export class CarsComponent implements OnInit {

  car = new Car();
  cars: Car[] = [];
  isLoading = true;
  isEditing = false;

  constructor(private carService: CarService,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.getCars().subscribe(
      data => this.cars = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  enableEditing(car: Car): void {
    this.isEditing = true;
    this.car = car;
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.car= new Car();
    this.toast.setMessage('item editing cancelled.', 'warning');
    // reload the cars to reset the editing
    this.getCars();
  }

  editCar(car: Car): void {
    this.carService.editCar(car).subscribe(
      () => {
        this.isEditing = false;
        this.car = car;
        this.toast.setMessage('item edited successfully.', 'success');
      },
      error => console.log(error)
    );
  }

  deleteCar(car: Car): void {
    if (window.confirm('Are you sure you want to permanently delete this item?')) {
      this.carService.deleteCar(car).subscribe(
        () => {
          this.cars = this.cars.filter(elem => elem._id !== car._id);
          this.toast.setMessage('item deleted successfully.', 'success');
        },
        error => console.log(error)
      );
    }
  }

}
