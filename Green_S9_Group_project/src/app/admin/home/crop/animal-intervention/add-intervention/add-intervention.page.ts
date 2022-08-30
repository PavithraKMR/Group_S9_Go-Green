import { Component, OnInit } from '@angular/core';
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
	selector: 'app-add-intervention',
	templateUrl: './add-intervention.page.html',
	styleUrls: ['./add-intervention.page.scss']
})
export class AddInterventionPage implements OnInit {
	tipSub: Subscription;
	cropTips: CropTips[];
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	paramSub: Subscription;
	constructor(
		private loadCtrl: LoadingController,
		private modelCtrl: ModalController,
		private homeService: HomeService,
		private route: ActivatedRoute
	) {}

	ngOnInit() {
		this.isLoading = true;
		this.paramSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paraMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
					this.isLoading = false;
				});
		});
	}

	ngOnDestroy() {
		if (this.cropSub || this.paramSub) {
			this.cropSub.unsubscribe();
			this.paramSub.unsubscribe();
		}
	}
}
