import { HomeService } from 'src/app/admin/service/home.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/login/auth.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
	selector: 'app-add-zone',
	templateUrl: './add-zone.page.html',
	styleUrls: ['./add-zone.page.scss']
})
export class AddZonePage implements OnInit, OnDestroy {
	constructor(private router: Router, private homeService: HomeService) {}

	ngOnInit() {}

	close() {
		this.router.navigateByUrl('/admin/tabs/home');
	}

	authSub: Subscription;

	submitForm(form: NgForm) {
		if (!form.valid) {
			return;
		}

		this.authSub = this.homeService
			.addZone(form.value.zoneName)
			.subscribe(() => {
				this.router.navigateByUrl('/admin/tabs/home');
			});
	}

	ngOnDestroy(): void {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
}
