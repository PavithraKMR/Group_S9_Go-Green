import { HomeService } from 'src/app/admin/service/home.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.page.html',
	styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit, OnDestroy {
	constructor(
		private userService: UserService,
		private route: Router,
		private authService: AuthService,
		private homeService: HomeService
	) {}

	authSub: Subscription;
	zoneSub: Subscription;
	isLoading = false;
	zones = [];
	ngOnInit() {
		this.isLoading = true;
		this.zoneSub = this.homeService.getZones().subscribe(zones => {
			this.zones = zones;
      console.log(zones);

			this.isLoading = false;
		});
	}

	submittedForm(form: NgForm) {
		if (!form.valid) {
			console.log('not');

			return;
		}

		console.log(form);

		this.authSub = this.authService
			.signup(
				form.value.username,
				form.value.yourname,
				form.value.mobile,
				form.value.nic,
				form.value.address,
				form.value.zone,
				form.value.password
			)
			.subscribe(() => {
				this.route.navigateByUrl('/dashboard/tabs/home');
			});
	}

	ngOnDestroy(): void {
		if (this.zoneSub || this.authSub) {
			this.zoneSub.unsubscribe();
			this.authSub.unsubscribe();
		}
	}
}
