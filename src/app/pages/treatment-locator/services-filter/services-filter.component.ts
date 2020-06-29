import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  typeOfCare,
  serviceSettings,
  opioidTreatment,
  facilityOperation,
  paymentAssistance,
  paymentInsuranceFunding,
  specialPrograms,
  otherLanguages,
  otherAddictions,
  ageGroupAccepted,
  genderAccepted,
  exclusiveServices,
  languageServices,
  americanIndianLanguages,
  otherServiceLanguages,
} from '../data';

@Component({
  selector: 'app-services-filter',
  templateUrl: './services-filter.component.html',
  styleUrls: ['./services-filter.component.scss'],
})
export class ServicesFilterComponent implements OnInit {
  @Input() serviceFilter: any[];

  data = [
    {
      id: 1,
      name: 'Type of Care',
      data: typeOfCare,
      opened: true,
    },
    {
      id: 2,
      name: 'Service Settings (e.g., Outpatient, Residential, Inpatient etc.)',
      data: serviceSettings,
      opened: true,
    },
    {
      id: 3,
      name: 'Type of Opioid Treatment',
      data: opioidTreatment,
      opened: true,
    },
    {
      id: 4,
      name: 'Facility Operation (e.g. Private, Public)',
      data: facilityOperation,
      opened: true,
    },
    {
      id: 5,
      name: 'Payment/Insurance/Funding Accepted',
      data: paymentInsuranceFunding,
      opened: true,
    },
    {
      id: 6,
      name: 'Payment Assistance Available',
      data: paymentAssistance,
      opened: true,
    },
    {
      id: 7,
      name: 'Special Programs/Groups Offered',
      data: specialPrograms,
      opened: true,
    },
    {
      id: 8,
      name: 'Other Addictions',
      data: otherAddictions,
      opened: true,
    },
    {
      id: 9,
      name: 'Age Groups Accepted',
      data: ageGroupAccepted,
      opened: true,
    },
    {
      id: 10,
      name: 'Gender Accepted',
      data: genderAccepted,
      opened: true,
    },
    {
      id: 11,
      name: 'Exclusive Services',
      data: exclusiveServices,
      opened: true,
    },
    {
      id: 12,
      name: 'Language Services',
      data: languageServices,
      opened: true,
    },
    {
      id: 13,
      name: 'American Indian or Alaskan Native Languages',
      data: americanIndianLanguages,
      opened: true,
    },
    {
      id: 14,
      name: 'Other Languages',
      data: otherServiceLanguages,
      opened: true,
    },
  ];
  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.serviceFilter.length > 0 ? this.toggleCheckProperty() : this.addCheckProperty();
  }

  toggleCheckProperty() {
    this.data = this.data.map((item) => {
      item.data = item.data.map((d) => {
        const currentItem = this.serviceFilter.find((i) => i.id === item.id);
        let status = currentItem ? currentItem.data.some((s) => s.value === d.value) : false;
        d.isChecked = status;
        return d;
      });
      return item;
    });
  }

  addCheckProperty() {
    this.data = this.data.map((item) => {
      item.data = item.data.map((d) => {
        d.isChecked = false;
        return d;
      });
      return item;
    });
  }

  /**
   * @description Closes the more info modal
   * @returns void
   */
  close(): void {
    this.modalController.dismiss();
  }

  toggle(id) {
    this.data = this.data.map((item) => {
      item.id === id ? (item.opened = !item.opened) : null;
      return item;
    });
  }
  /**
   * Select the data from list servcies/languages
   */
  select() {
    const data = this.data
      .filter((item) => item.data.some((i) => i.isChecked === true))
      .map((item) => {
        return {
          id: item.id,
          data: item.data
            .filter((i) => i.isChecked === true)
            .map((i) => {
              return { name: i.name, value: i.value };
            }),
        };
      });

    this.modalController.dismiss(data);
  }
}
