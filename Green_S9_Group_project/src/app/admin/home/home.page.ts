import { AuthService } from 'src/app/login/auth.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from '../service/home.service';
<<<<<<< HEAD
import { Preferences } from '@capacitor/preferences';
=======
>>>>>>> main

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
<<<<<<< HEAD
	value;
=======

>>>>>>> main
	ngOnInit() {
		this.cropsSub = this.homeService.AllCrops.subscribe(crops => {
			this.crops = crops;
		});

<<<<<<< HEAD
		this.authSub = this.authService.isAuthenticated.subscribe(data => {});

		this.authService.autoLogin();
=======
		this.authSub = this.authService.isAuthenticated.subscribe(data => {
			console.log(data);
		});
>>>>>>> main
	}
}

//projectgreen151
//@greenproject151
