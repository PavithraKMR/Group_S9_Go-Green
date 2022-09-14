import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/admin/service/notification.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-view',
	templateUrl: './view.page.html',
	styleUrls: ['./view.page.scss']
})
export class ViewPage implements OnInit, OnDestroy {
	constructor(
		private notificationService: NotificationService,
		private route: ActivatedRoute
	) {}
	notiSub: Subscription;
	paraSub: Subscription;
	notification: any;

	// export class Notification {
	//   notificationId: string;
	//   date: string;
	//   message: string;
	//   reply: boolean;
	//   userId: string;
	// }

	isLoading = false;

	ngOnInit() {
		this.isLoading = true;

		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('id')) {
				return;
			}

			this.notiSub = this.notificationService
				.getAllUserNotification(paramMap.get('id'))
				.subscribe(notification => {
					this.notification = notification;
					this.isLoading = false;
				});
		});
	}

  ionViewWillEnter()
  {
    this.isLoading = true;

		this.paraSub = this.route.paramMap.subscribe(paramMap => {
			if (!paramMap.has('id')) {
				return;
			}

			this.notiSub = this.notificationService
				.getAllUserNotification(paramMap.get('id'))
				.subscribe(notification => {
					this.notification = notification;
					this.isLoading = false;
				});
		});
  }

	ngOnDestroy(): void {
		if (this.paraSub || this.notiSub) {
			this.paraSub.unsubscribe();
			this.notiSub.unsubscribe();
		}
	}
}
