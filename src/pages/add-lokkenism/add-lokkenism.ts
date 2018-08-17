import { Component } from '@angular/core';
import { ViewController, NavParams, AlertController } from 'ionic-angular';
import { LokkenismsProvider, Lokkenism } from '../../providers/lokkenisms/lokkenisms';
import * as moment from 'moment';
import * as _ from 'lodash';

@Component({
  selector: 'page-add-lokkenism',
  templateUrl: 'add-lokkenism.html',
})
export class AddLokkenismPage {

  existingLokkenism: any;
  lokkenism: Lokkenism;

  constructor(
    public navParams: NavParams,
    public view: ViewController,
    private db: LokkenismsProvider,
    private alert: AlertController
  ) { 
    this.existingLokkenism = navParams.get('lokkenism');
    this.lokkenism = _.cloneDeep(this.existingLokkenism) || this.newLokkenism();
  }

  newLokkenism() {
    return {
      quote: '',
      note: '',
      author: ''
    };
  }

  noChange() {
    return JSON.stringify(this.lokkenism) === JSON.stringify(this.existingLokkenism);
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

  editLokkenism() {
    this.db.editLokkenism(this.lokkenism);
    this.view.dismiss();
  }

  deleteLokkenism() {
    let alert = this.alert.create({
      title: 'Delete Lokkenism',
      message: 'Deleted Lokkenisms can be recovered manually from the database.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.db.deleteLokkenism(this.lokkenism);
            this.view.dismiss();
          }
        }
      ]
    });
    alert.present(); 
  }

}
