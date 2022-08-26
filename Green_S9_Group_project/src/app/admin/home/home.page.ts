import { AuthService } from 'src/app/login/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from '../service/home.service';
import { Preferences } from '@capacitor/preferences';

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	constructor(
		private homeService: HomeService,
		private authService: AuthService
	) {}

	crops: Crop[];

	cropsSub: Subscription;
	authSub: Subscription;
	value;
	ngOnInit() {
		this.cropsSub = this.homeService.AllCrops.subscribe(crops => {
			this.crops = crops;
		});

		this.authSub = this.authService.isAuthenticated.subscribe(data => {});

		this.authService.autoLogin();
	}
}

//projectgreen151
//@greenproject151
