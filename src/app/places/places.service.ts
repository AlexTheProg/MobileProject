/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      'p1',
      'Manhattan Mansion',
      'In the heart of NYC',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/1920px-Above_Gotham.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2022-12-31')
    ),
    new Place(
      'p2',
      'Boston Mansion',
      'In the heart of Boston',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Boston_Montage.png/1024px-Boston_Montage.png',
      149.99,
      new Date('2019-01-01'),
      new Date('2022-12-31')
    ),
    new Place(
      'p3',
      'Paris Mansion',
      'In the heart of Paris',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Paris_montage2.jpg/450px-Paris_montage2.jpg',
      149.99,
      new Date('2019-01-01'),
      new Date('2022-12-31')
    ),
  ];

  constructor() {}

  get places() {
    return [...this._places];
  }

  getPlace(id: string){
    return {...this._places.find(p => p.id === id)};
  }
}
