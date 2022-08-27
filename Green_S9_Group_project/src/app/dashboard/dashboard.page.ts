<<<<<<< HEAD
import { Router } from '@angular/router';
import { AuthService } from 'src/app/login/auth.service';
=======
>>>>>>> main
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

<<<<<<< HEAD
  constructor(private authService:AuthService,private router:Router) { }
=======
  constructor() { }
>>>>>>> main

  ngOnInit() {
  }

<<<<<<< HEAD
  logout() {
		this.authService.logout();
		this.router.navigateByUrl('/login');
	}
=======
>>>>>>> main
}
