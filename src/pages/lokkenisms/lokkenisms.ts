import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import * as _ from 'lodash';
import { Lokkenism, LokkenismsProvider } from '../../providers/lokkenisms/lokkenisms';
import { AddLokkenismPage } from '../add-lokkenism/add-lokkenism';

@IonicPage({
  segment: 'lokkenisms'
})
@Component({
  selector: 'page-lokkenisms',
  templateUrl: 'lokkenisms.html',
})
export class LokkenismsPage {

  filterText: String = '';
  lokkenisms: Lokkenism[];
  years: any = [];
  loading: boolean = true;

  constructor(
    db: LokkenismsProvider,
    private modal: ModalController
  ) {
    db.getLokkenisms().subscribe(lokkenisms => {

      this.lokkenisms = lokkenisms;

      this.years = _(lokkenisms)
        .groupBy('year')
        .map((lokkenisms, year) => {
          return { 
            year: year === 'undefined' ? 'Unknown Year' : year, 
            lokkenisms: _.orderBy(lokkenisms, ({ timestamp }) => timestamp || 0, ['desc'])
          };
        })
        .sortBy('year')
        .reverse()
        .value();

      this.loading = false;

    });
  }

  filteredItems(theYears) {
    // clone the data so we don't modify it accidentally
    let cloned = _.cloneDeep(theYears);
    let lowercaseFilterText = this.filterText.toLowerCase();

    return _.filter(cloned, year => {
      year.lokkenisms = _.filter(year.lokkenisms, lokkenism => {
        return this.matches(lokkenism.quote, lowercaseFilterText) ||
          this.matches(lokkenism.author, lowercaseFilterText) || 
          this.matches(lokkenism.note, lowercaseFilterText);
      });
      
      return year.lokkenisms.length > 0;
    });
  }

  matches(text, filterText) {
    return text && text.toLowerCase().includes(filterText);
  }

  openModal($event) {
    const modal = this.modal.create(AddLokkenismPage);
    modal.present();
  }

}
