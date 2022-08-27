<<<<<<< HEAD
import { Preferences } from '@capacitor/preferences';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Subscription } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { Users } from '../models/users.model';
import { User } from './user.model';

=======
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, from } from 'rxjs';
import { map, take, tap, switchMap } from 'rxjs/operators';
import { Users } from '../models/users.model';
import { User } from './user.model';
import { Plugins } from '@capacitor/core';
>>>>>>> main
// ng build
// ionic capacitor add android
// ionic capacitor copy android
//ionic capacitor run android
export interface AuthResponseData {
	role: string;
	username: string;
	userId: string;
	expiredIn: String;
	token: String;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private router: Router, private http: HttpClient) {}

	private _user = new BehaviorSubject<User>(null);
<<<<<<< HEAD
=======
	// // private _userId = null;
	// private _users = new BehaviorSubject<Users[]>(null);

	// get getAllUsers() {
	// 	return this._users.asObservable();
	// }

	// fetchAllUsers() {
	// 	return this.http
	// 		.get<{ [key: string]: Users }>(
	// 			'https://greenproject-6f3b9-default-rtdb.firebaseio.com/users.json'
	// 		)
	// 		.pipe(
	// 			take(1),
	// 			map(data => {
	// 				const users = [];
	// 				for (const key in data) {
	// 					if (data.hasOwnProperty(key)) {
	// 						users.push({
	// 							userId: key,
	// 							userName: data[key].userName,
	// 							yourName: data[key].yourName,
	// 							password: this.decryptData(data[key].password),
	// 							mobile: data[key].mobile,
	// 							nic: this.decryptData(data[key].nic),
	// 							role: data[key].role,
	// 							address: data[key].address,
	// 							registerd: data[key].registerd,
	// 							token: this.decryptData(data[key].token),
	// 							zone: data[key].zone
	// 						});
	// 					}
	// 				}

	// 				return users;
	// 			}),
	// 			tap(data => {
	// 				this._users.next(data);
	// 			})
	// 		)
	// 		.subscribe(users => {
	// 			console.log(users);
	// 		});
	// }
>>>>>>> main

	get isAuthenticated() {
		return this._user.asObservable().pipe(
			map(user => {
				if (user) {
					return !!user.token;
				} else {
					return false;
				}
			})
		);
	}

<<<<<<< HEAD
=======
	// get getUserId()
	// {
	//   return this._userId;
	// }

>>>>>>> main
	get getUserId() {
		return this._user.asObservable().pipe(
			map(user => {
				if (user) {
					return user.userId;
				} else {
					return null;
				}
			})
		);
	}
	login(userName: string, password: string) {
		const data = { username: userName, password: password };

		return this.http
			.post<any>('http://localhost:5000/api/GreenLive/SignIn', data)
			.pipe(tap(this.setUserData.bind(this)));
	}

	logout() {
<<<<<<< HEAD
		this._user.next(null);

		Preferences.remove({ key: 'userData' });
=======
		// this._isAuthenticated = false
		this._user.next(null);
		localStorage.removeItem('token');
		this.router.navigateByUrl('/login');
>>>>>>> main
	}

	signup(
		userName: string,
		yourName: string,
		mobile: string,
		nic: string,
		address: string,
		zone: string,
		password: string
	) {
		const newuser = {
			username: userName,
			yourname: yourName,
			mobile: mobile,
			nic: nic,
			address: address,
			zone: zone,
			password: password,
			role: 'farmer'
		};

		return this.http
			.post<AuthResponseData>(
				'http://localhost:5000/api/GreenLive/SignUp',
				newuser
			)
			.pipe(tap(this.setUserData.bind(this)));
	}

	private storeAuthData(
		role: string,
		userId: string,
		username: string,
		token: string,
		tokenExpirationDate: string
	) {
		const data = JSON.stringify({
			role: role,
			username: username,
			localId: userId,
			idToken: token,
			tokenExpirationDate: tokenExpirationDate
		});

<<<<<<< HEAD
		// localStorage.setItem('data', data);
		// Preferences.Storage.set({ key: 'authData', value: data });
		Preferences.set({ key: 'userData', value: data });
=======
		console.log(data);

		localStorage.setItem('data', JSON.stringify(data));
		// Plugins.Storage.set({ key: 'authData', value: data });
>>>>>>> main
	}

	private setUserData(userData: AuthResponseData) {
		const expirationTime = new Date(new Date().getTime() + +3600 * 1000);

		this._user.next(
			new User(
				userData['data'].role,
				userData['data'].userId,
				userData['data'].username,
				userData['data'].token,
				expirationTime
			)
		);

		this.storeAuthData(
			userData['data'].role,
			userData['data'].userId,
			userData['data'].username,
			userData['data'].token,
			expirationTime.toISOString()
		);
	}

<<<<<<< HEAD
	authSub: Subscription;
	getUser(userId: string) {
		let user = [];

		return this.http.get<any>('http://localhost:5000/api/user/'+ userId).pipe(
			take(1),
			map(resData => {

        return {
          userId:resData.data.user.id,
          userName:resData.data.user.username,
          yourName:resData.data.user.yourname,
          mobile:resData.data.user.mobile,
          nic:resData.data.user.nic,
          address:resData.data.user.address,
          zone:resData.data.user.zone
        }
			})
		);
	}

	autoLogin() {
		return from(Preferences.get({ key: 'userData' })).pipe(
			map(storeData => {
				if (!storeData || !storeData.value) {
					// if (!storeData) {
					return null;
				}

				// const parsedData = JSON.parse(storeData) as {
				const parsedData = JSON.parse(storeData.value) as {
					localId: string;
					idToken: string;
					role: string;
					username: string;
					tokenExpirationDate: string;
				};

				const expirationTime = new Date(parsedData.tokenExpirationDate);

				if (expirationTime <= new Date()) {
					return null;
				}

				const user = new User(
					parsedData.role,
					parsedData.localId,
					parsedData.username,
					parsedData.idToken,
					expirationTime
				);

				return user;
			}),
			tap(user => {
				this._user.next(user);
			}),
			map(user => {
				return !!user;
			})
		);
	}

	ngOnDestroy() {
		if (this.authSub) {
			this.authSub.unsubscribe();
		}
	}
=======
	getUser(token: string) {
		let user = [];

		return this.http
			.get(
				`https://greenproject-6f3b9-default-rtdb.firebaseio.com/users.json?orderBy="token"&equalTo="${token}"`
			)
			.pipe(
				take(1),
				map(resData => {
					console.log(resData);

					return resData;
				})
			);
	}

	// autoLogin() {
	// 	return from(Plugins.Storage.get({ key: 'authData' })).pipe(
	// 		map(storeData => {
	// 			if (!storeData || !storeData.value) {
	// 				return null;
	// 			}

	// 			const parsedData = JSON.parse(storeData.value) as {
	// 				userId: string;
	// 				token: string;
	// 				role: string;
	// 				username: string;
	// 				tokenExpirationDate: string;
	// 			};

	// 			const expirationTime = new Date(parsedData.tokenExpirationDate);

	// 			if (expirationTime <= new Date()) {
	// 				return null;
	// 			}

	// 			const user = new User(
	// 				parsedData.role,
	// 				parsedData.userId,
	// 				parsedData.username,
	// 				parsedData.token,
	// 				expirationTime
	// 			);

	// 			return user;
	// 		}),
	// 		tap(user => {
	// 			this._user.next(user);
	// 		}),
	// 		map(user => {
	// 			return !!user;
	// 		})
	// 	);
	// }
>>>>>>> main
}
