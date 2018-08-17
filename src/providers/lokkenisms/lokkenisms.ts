import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';

export interface Lokkenism {
  id?: String;
  quote: String;
  author?: String;
  note?: String;
  year?: number;
  timestamp?: number;

  edited?: boolean;
  deleted?: boolean;
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
    return this.lokkenisms.snapshotChanges().map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      })
    });
  }

  editLokkenism(lokkenism: Lokkenism) {
    // only allow updating the quote, author, and note
    var updates = _.pick(lokkenism, ['quote', 'author', 'note']);
    return this.lokkenisms.doc(lokkenism.id).update(_.extend(updates, {edited: true}));
  }

  deleteLokkenism(lokkenism: Lokkenism) {
    return this.lokkenisms.doc(lokkenism.id).update({deleted: true});
  }
}
