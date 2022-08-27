import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AnimationController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from 'express';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';

@Component({
  selector: 'app-edit-tip',
  templateUrl: './edit-tip.page.html',
  styleUrls: ['./edit-tip.page.scss'],
})
export class EditTipPage implements OnInit,OnDestroy {
	constructor(
		private animationCtrl: AnimationController,
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute,
    private router:Router
	) {}

	tipidSub: Subscription;
	cropTip: CropTips;
	isLoading = false;
	cropTipSub: Subscription;

	ngOnInit() {
		// this.isLoading = true;

		// this.tipidSub = this.route.paramMap.subscribe(paraMap => {
		// 	if (!paraMap.has('tipId')) {
		// 		return;
		// 	}


		// 	this.cropTipSub = this.homeService
		// 		.getTip(paraMap.get('tipId'))
		// 		.subscribe(tip => {
		// 			this.cropTip = tip;
		// 			this.isLoading = false;
		// 		});
		// });
	}



	ionViewWillEnter() {
		this.isLoading = true;
		 this.tipidSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('tipId')) {
				return;
			}

			this.cropTipSub = this.homeService
				.getTip(paraMap.get('tipId'))
				.subscribe(tip => {
					this.cropTip = tip;

					this.isLoading = false;
				});
		});
	}



	ngOnDestroy() {
		if (this.cropTipSub  || this.tipidSub)  {
			this.cropTipSub.unsubscribe();
			this.tipidSub.unsubscribe();
		}
	}
}
