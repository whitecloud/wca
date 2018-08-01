import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LokkenismsProvider, Lokkenism } from '../../providers/lokkenisms/lokkenisms';
import * as moment from 'moment';

@Component({
  selector: 'page-add-lokkenism',
  templateUrl: 'add-lokkenism.html',
})
export class AddLokkenismPage {

  lokkenism: Lokkenism;

  constructor(
    public view: ViewController,
    private db: LokkenismsProvider
  ) { 
    this.lokkenism = this.newLokkenism();
  }

  newLokkenism() {
    return {
      quote: '',
      note: '',
      author: ''
    };
  }

  addLokkenism() {
    // add information about now
    var today = moment();
    this.lokkenism.year = parseInt(today.format('YYYY'));
    this.lokkenism.timestamp = today.unix();

    // add to the collection and close the modal
    this.db.addLokkenism(this.lokkenism);
    this.view.dismiss();
  }

}
