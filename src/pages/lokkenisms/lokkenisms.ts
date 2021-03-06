import { Component } from '@angular/core';
import { IonicPage, ModalController } from 'ionic-angular';
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
  filteredYears: any = [];
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
            lokkenisms: _(lokkenisms)
              .orderBy(({ timestamp }) => timestamp || 0, ['desc'])
              .filter(({ deleted }) => deleted !== true)
              .value()
          };
        })
        .sortBy('year')
        .reverse()
        .value();

      this.filterYears();

      this.loading = false;

    });
  }

  filterYears() {
    // clone the data so we don't modify it accidentally
    let cloned = _.cloneDeep(this.years);
    let lowercaseFilterText = this.filterText.toLowerCase();

    this.filteredYears = _.filter(cloned, year => {
      year.lokkenisms = _.filter(year.lokkenisms, lokkenism => {
        return this.matches(lokkenism.quote, lowercaseFilterText) ||
          this.matches(lokkenism.author, lowercaseFilterText) || 
          this.matches(lokkenism.note, lowercaseFilterText) ||
          this.matches(year.year.toString(), lowercaseFilterText);
      });
      
      return year.lokkenisms.length > 0;
    });
  }

  matches(text, filterText) {
    return text && text.toLowerCase().includes(filterText);
  }

  openModal() {
    const modal = this.modal.create(AddLokkenismPage);
    modal.present();
  }

  editLokkenism(lokkenism) {
    const modal = this.modal.create(AddLokkenismPage, { lokkenism: lokkenism });
    modal.present();
  }

}
