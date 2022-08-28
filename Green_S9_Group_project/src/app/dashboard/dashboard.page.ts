import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }


  ngOnInit() {
  }

  logout() {
		this.authService.logout();
		this.router.navigateByUrl('/login');
	}

}
