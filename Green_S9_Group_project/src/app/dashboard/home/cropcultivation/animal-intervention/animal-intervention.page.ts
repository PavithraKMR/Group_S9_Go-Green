import { HomeService } from './../../HomeServices/home.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
	AnimationController,
	LoadingController,
	ModalController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Disease } from 'src/app/models/disease.model';
import { Crop } from 'src/app/models/crop.model';
import { Intervention } from 'src/app/models/intervention.model';
import { AnimalinterventionService } from 'src/app/admin/service/animalintervention.service';

@Component({
	selector: 'app-animal-intervention',
	templateUrl: './animal-intervention.page.html',
	styleUrls: ['./animal-intervention.page.scss']
})
export class AnimalInterventionPage implements OnInit, OnDestroy {
	constructor(
		private homeService: HomeService,
		private route: ActivatedRoute,
		private router: Router,
		private animalIntervention: AnimalinterventionService
	) {}

	tipSub: Subscription;
	idSub: Subscription;
	crop: Crop;
	isLoading = false;
	cropSub: Subscription;
	interventions: Intervention[];

	ngOnInit() {
		this.isLoading = true;

		this.idSub = this.route.paramMap.subscribe(paraMap => {
			if (!paraMap.has('cropId')) {
				return;
			}

			this.cropSub = this.homeService
				.getCrop(paraMap.get('cropId'))
				.subscribe(crop => {
					this.crop = crop;
				});
		});
	}

	ionViewWillEnter() {
		this.isLoading = true;
		this.tipSub = this.animalIntervention
			.fetchInterventions(this.crop.name)
			.subscribe(interventions => {
				this.interventions = interventions;
				console.log(this.interventions);

				this.isLoading = false;
			});
	}

	about(id: string) {
		this.router.navigate([
			'/dashboard',
			'tabs',
			'home',
			this.crop.name,
			'diseases',
			'about-disease',
			id
		]);
	}

	remedy(id: string) {
		this.router.navigate([
			'/dashboard',
			'tabs',
			'home',
			this.crop.name,
			'diseases',
			'remedy-disease',
			id
		]);
	}

	ngOnDestroy() {
		if (this.tipSub || this.idSub || this.cropSub) {
			this.tipSub.unsubscribe();
			this.cropSub.unsubscribe();
			this.idSub.unsubscribe();
		}
	}
}
