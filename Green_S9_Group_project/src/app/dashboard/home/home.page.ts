/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Crop } from 'src/app/models/crop.model';
import { HomeService } from './HomeServices/home.service';

import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;
const API_KEY = environment.API_KEY;

@Component({
	selector: 'app-home',
	templateUrl: './home.page.html',
	styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
	weatherTemp: any;
	todayDate = new Date();
	cityName: any;
	weatherIcon: any;
	weatherDetails: any;
	//extra add
	windSpeed: any;
	max_temp: any;
	min_temp: any;
	humidity: any;
	constructor(private homeService: HomeService, public httpClient: HttpClient) {
  }

<<<<<<< HEAD
  weatherTemp: any;
  todayDate = new Date();
  cityName: any;
  weatherIcon: any;
  weatherDetails: any;
  windSpeed: any;

  constructor(private homeService: HomeService, public httpClient: HttpClient) { 
  }
=======
	loadData() {
		this.httpClient
			.get(`${API_URL}/weather?q=${'jaffna'},{'ISO 3166-1'}&appid=${API_KEY}`)
			.subscribe(results => {

>>>>>>> origin/master

				this.weatherTemp = results['main'].temp;
				this.max_temp = results['main'].temp_max;
				this.min_temp = results['main'].temp_min;
				this.humidity = results['main'].humidity;
				this.cityName = results['name'];

				this.weatherIcon = results['weather'][0];

				this.weatherIcon = `http://openweathermap.org/img/wn/${this.weatherIcon
					.icon}@4x.png`; //not weatherDeatail
				this.windSpeed = results['wind'].speed;
			});
	}

<<<<<<< HEAD
  ngOnInit() {
    this.loadData();
=======
	crops: Crop[];
>>>>>>> origin/master

	cropsSub: Subscription;

	ngOnInit() {
    this.loadData();

		this.cropsSub = this.homeService.Allcrops.subscribe(crops => {
			this.crops = crops;
		});
	}

}
