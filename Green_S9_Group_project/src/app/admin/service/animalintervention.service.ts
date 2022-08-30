import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { Crop } from 'src/app/models/crop.model';
import { Disease } from 'src/app/models/disease.model';
import { CropTips } from '../models/croptips.models';
@Injectable({
	providedIn: 'root'
})
export class AnimalinterventionService {
	constructor(private http: HttpClient) {}

	private _intervention = new BehaviorSubject([]);

	get AllInterventions() {
		return this._intervention.asObservable();
	}

	fetchInterventions(name: string) {
		return this.http
			.get<any>('http://localhost:5000/api/crop/getTips/' + name)
			.pipe(
				take(1),
				map(data => {
					if (data.message) {
						return data;
					} else {
						const tips = [];
						for (var tip of data.cropTips) {
							tips.push({
								tipsId: tip.id,
								name: tip.name,

								information: tip.information
							});
						}

						return tips;
					}
				}),
				tap(data => {
					this._croptips.next(data);
				})
			);
	}

	addIntervention(name: string, information: string) {
		let genId: string;
		const newCropTip = {
			cropName: name,

			information: information
		};
		return this.http
			.post<any>('http://localhost:5000/api/crop/createTip', newCropTip)
			.pipe(
				take(1),
				switchMap(data => {
					return this.AllcropTips;
				}),
				tap(tips => {
					this._croptips.next(tips);
				})
			);
	}

	getIntervention(tipId: string) {
		return this.http
			.get<any>('http://localhost:5000/api/crop/cropTips/' + tipId)
			.pipe(
				take(1),
				map(data => {
					return {
						tipsId: data.tip.id,
						name: data.tip.cropName,
						// type: data.tip.type,

						information: data.tip.information
					};
				})
			);
	}

	updateIntervention(id: string, name: string, information: string) {
		let updatedtips: CropTips[];
		return this.AllcropTips.pipe(
			take(1),
			switchMap(tips => {
				if (!tips || tips.length <= 0) {
					return this.fetchAlltips(name);
				} else {
					return of(tips);
				}
			}),
			switchMap(tips => {
				const index = tips.findIndex(p => p.tipsId === id);
				const oldtip = tips[index];

				updatedtips = [...tips];

				updatedtips[index] = {
					tipsId: id,
					name: name,

					information: information
				};

				return this.http.put(
					`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${id}.json`,
					{ ...updatedtips[index], tipsId: null }
				);
			}),
			tap(() => {
				this._croptips.next(updatedtips);
			})
		);
	}

	DeleteIntervention(id: string) {
		return this.http
			.delete('http://localhost:5000/api/crop/cropTips/delete/' + id)
			.pipe(
				take(1),
				switchMap(res => {
					return this.AllcropTips;
				}),
				tap(tips => {
					this._croptips.next(tips.filter(p => p.tipsId !== id));
				})
			);
	}
}
