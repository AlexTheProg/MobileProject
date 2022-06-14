import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-create-bookings',
  templateUrl: './create-bookings.component.html',
  styleUrls: ['./create-bookings.component.scss'],
})
export class CreateBookingsComponent implements OnInit {

  @Input() selectedPlace: Place;
  @ViewChild('f', {static: true}) form: NgForm;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onCancel(){
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace(){
    if(!this.form.valid || !this.areDatesValid()){
      return;
    }

    this.modalCtrl.dismiss({bookingData : {
      firstName: this.form.value['first-name'],
      lastName: this.form.value['last-name'],
      guestNumber: +this.form.value['guest-number'],
      startDate: new Date(this.form.value['date-from']),
      endDate: new Date(this.form.value['date-to'])
    }}, 'confirm');
  }

  areDatesValid(){
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);

    return endDate > startDate;
  }

}
