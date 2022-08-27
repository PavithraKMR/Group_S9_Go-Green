<<<<<<< HEAD
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { NotificationService } from 'src/app/admin/service/notification.service';

@Component({
	selector: 'app-notification',
	templateUrl: './notification.page.html',
	styleUrls: ['./notification.page.scss']
})
export class NotificationPage implements OnInit, OnDestroy {
	constructor(private notificationService: NotificationService) {}

	notifications: Notification[];
	notiSub: Subscription;
	isLoading = false;
	ngOnInit() {
		this.isLoading = true;
		this.notiSub = this.notificationService.AllNotification.subscribe(
			notification => {
				this.notifications = notification;
				this.isLoading = false;
			}
		);
	}

	ionViewWillEnter() {
		this.isLoading = true;

		this.notiSub = this.notificationService
			.fetchAllNotifications()
			.subscribe(notifications => {
				this.notifications = notifications;
				this.isLoading = false;
			});
	}

	ngOnDestroy() {
		if (this.notiSub) {
			this.notiSub.unsubscribe;
		}
	}
=======
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(private list: NotificationService,private AlertCtrl: AlertController,private router: Router) { }

  Customers: Customer[];

  isLoading = false;

  ngOnInit() {
    this.isLoading = true
    this.list.getAllCustomers().subscribe((data: any[])=>{
      this.Customers = data['result'];
      this.isLoading=false;
    });
  }

  ngIonViewWillEnter()
  {
    this.isLoading=true;

    this.list.getAllCustomers().subscribe((data: any[])=>{
      this.Customers = data['result'];
      this.isLoading=false;

    });
  }


  EditShop(shopId: string,item: IonItemSliding)
  {
    item.close();
    this.router.navigate(['/dashboard','tabs','notification','edit',shopId]);
  }
  cancelSub:Subscription;

  DeleteShop(id: string,item: IonItemSliding)
  {

    this.AlertCtrl.create({
      header:"Do You Want to Delete",
      message:'If you delete it will be removed',
      buttons:[
        {
            text:'Okay',
            handler:()=>{
              item.close();
              this.cancelSub=this.list.cancelCustomer(id).subscribe()
            }
          }]
        }).then(e=>{e.present()});
  }



>>>>>>> main
}
