import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { HelpComponent } from 'src/app/components/help/help.component';
import { ModalController, AlertController } from '@ionic/angular';
import { GetDataService } from 'src/app/services/getdata';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  menus: any[] = [];
  // menus = [
  //   {
  //     name: 'Preparing to Deploy',
  //     linkParam: 'Prepare_to_Deploy'
  //   },
  //   {
  //     name: 'On-the-Ground Assistance',
  //     linkParam: 'On-the-Ground_Assistance'
  //   },
  //   {
  //     name: 'Postdeployment Guide',
  //     linkParam: 'Postdeployment_Guide'
  //   }
  // ];

  constructor(
    public utilService: UtilService,
    private router: Router,
    private modalController: ModalController,
    private dataService: GetDataService,
    private alertController: AlertController,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.loaderService.present();
    const data = await this.dataService.getAppData();
    console.log('TCL -> : AppComponent -> initializeApp -> data', data);

    if (!data) {
      await this.dataService.setLocalDatafromJSONFile();
      this.setMenu();
      this.loaderService.dismiss();
    } else {
      this.setMenu();
      this.loaderService.dismiss();
    }
  }

  async openPage() {
    const modal = await this.modalController.create({
      component: HelpComponent,
      cssClass: 'my-custom-class',
      animated: true,
      mode: 'ios',
    });
    return await modal.present();
  }

  async setMenu() {
    // const data = jsonContent["default"];
    // console.log("data==>", data);
    this.menus = await this.dataService.appData;
    console.log('HomePage -> setMenu -> this.menus', this.menus);
    // this.menus = data;
  }

  ionViewWillLeave() {
    console.log('View will leave');
    this.utilService.navigationAnimate();
  }

  // async retryGetData(alertMessage: string) {
  //   const alert = await this.alertController.create({
  //     header: 'SAMHSA',
  //     message: alertMessage,
  //     buttons: [
  //       {
  //         text: 'Exit',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (data) => {
  //           navigator['app'].exitApp();
  //         },
  //       },
  //       {
  //         text: 'Retry',
  //         handler: (data) => {
  //           this.getData();
  //         },
  //       },
  //     ],
  //   });

  //   await alert.present();
  // }
}
