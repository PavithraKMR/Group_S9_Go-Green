import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	AnimationController,
	LoadingController,
	ModalController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CropTips } from 'src/app/admin/models/croptips.models';
import { HomeService } from 'src/app/admin/service/home.service';
import { Crop } from 'src/app/models/crop.model';

@Component({
	selector: 'app-show-tip',
	templateUrl: './show-tip.page.html',
	styleUrls: ['./show-tip.page.scss']
})
export class ShowTipPage implements OnInit, OnDestroy {
	constructor(
		private animationCtrl: AnimationController,
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute
	) {}

	tipSub: Subscription;
	cropTip: CropTips;

	isLoading = false;
	cropSub: Subscription;
	cropTipSub: Subscription;
	Tips_for_choosing = 'Tips_for_choosing';
	ngOnInit() {
		this.isLoading = true;

		this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('tipId')) {
				return;
			}

			this.cropTipSub = this.homeService
				.getTip(paraMap.get('tipId'))
				.subscribe(tip => {
					this.cropTip = tip;
					console.log(this.cropTip);
					this.isLoading = false;

				});
		});
	}

	doRefresh(event) {
		setTimeout(() => {
			this.isLoading = true;


			this.tipSub = this.homeService
				.getTip(this.cropTip.tipsId)
				.subscribe(tips => {
					this.cropTip = tips;
					this.isLoading = false;
					console.log(this.cropTip);
				});

			event.target.complete();
		}, 2000);
	}

	ionViewWillEnter() {
		this.isLoading = true;
		this.tipSub = this.homeService
			.getTip(this.cropTip.tipsId)
			.subscribe(tips => {
				this.cropTip = tips;
				console.log(this.cropTip);

				this.isLoading = false;
			});
	}

	ngOnDestroy() {
		if (this.cropTipSub || this.tipSub) {
			this.cropTipSub.unsubscribe();
			this.tipSub.unsubscribe();

	}}
}
