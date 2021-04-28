import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CarService } from '../services/car.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { Car } from '../shared/models/car.model';

@Component({
  selector: 'app-add-car-form',
  templateUrl: './add-car-form.component.html',
  styleUrls: ['./add-car-form.component.scss']
})

export class AddCarFormComponent implements OnInit {
  @Input() cars!: Car[];

  addCarForm!: FormGroup;
  carname = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  bookdate = new FormControl('', Validators.required);

  constructor(private carService: CarService,
              private formBuilder: FormBuilder,
              public toast: ToastComponent) { }

  ngOnInit(): void {
    this.addCarForm = this.formBuilder.group({
      carname: this.carname,
      name: this.name,
      bookdate: this.bookdate
    });
  }

  addCar(): void {
    this.carService.addCar(this.addCarForm.value).subscribe(
      res => {
        this.cars.push(res);
        this.addCarForm.reset();
        this.toast.setMessage('item added successfully.', 'success');
      },
      error => console.log(error)
    );
  }

}
