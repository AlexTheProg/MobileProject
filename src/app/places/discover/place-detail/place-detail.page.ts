import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ActionSheetController,
  AlertController,
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { BookingService } from 'src/app/bookings/booking.service';
import { CreateBookingsComponent } from 'src/app/bookings/create-bookings/create-bookings.component';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  place: Place;
  isBookable = false;
  isLoading = false;
  placeSub: Subscription;

  constructor(
    private router: Router,
    private navControl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private bookingService: BookingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('placeId')) {
        this.navControl.navigateBack('/places/tabs/discover');
        return;
      }
      this.isLoading = true;
      this.placeSub = this.placesService
        .getPlace(paramMap.get('placeId'))
        .subscribe((place) => {
          this.isLoading = false;
          this.place = place;
          this.isBookable = place.userId !== this.authService.userId;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occured!',
            message: 'Could not load place.',
            buttons: [
              {
                text: 'Okay',
                handler: () => {
                  this.router.navigate(['/places/tabs/discover']);
                }
              }
            ]
          }).then(alertEl => {
            alertEl.present();
          });
        });
    });
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: 'Choose an action',
        buttons: [
          {
            text: 'Select Date',
            handler: () => {
              this.openBookingModal('select');
            },
          },
          {
            text: 'Random Date',
            handler: () => {
              this.openBookingModal('random');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }

  openBookingModal(mode: 'select' | 'random') {
    console.log(mode);

    this.modalCtrl
      .create({
        component: CreateBookingsComponent,
        componentProps: { selectedPlace: this.place },
      })
      .then((modal) => {
        modal.present();
        return modal.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        this.loadingCtrl
          .create({
            message: 'Booking place...',
          })
          .then((loadinEl) => {
            const data = resultData.data.bookingData;
            loadinEl.present();
            this.bookingService
              .addBooking(
                this.place.id,
                this.place.title,
                this.place.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate
              )
              .subscribe(() => {
                loadinEl.dismiss();
              });
          });
      });
  }

  ngOnDestroy(): void {
    this.placeSub.unsubscribe();
  }
}
