import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

export interface Lokkenism {
  quote: String;
  author?: String;
  note?: String;
  year?: number;
  timestamp?: number;
}

@Injectable()
export class LokkenismsProvider {

  lokkenisms: any;

  constructor(
    private afs: AngularFirestore
  ) {
    this.lokkenisms = this.afs.collection('lokkenisms');
  }

  addLokkenism(lokkenism: Lokkenism) {
    return this.lokkenisms.add(lokkenism);
  }

  getLokkenisms() {
    return this.lokkenisms.valueChanges();
  }
}
