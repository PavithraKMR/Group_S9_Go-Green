import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';

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
			.get<any>('http://localhost:5000/api/Intervention/' + name)
			.pipe(
				take(1),
				map(data => {
					if (data.message) {
						return data;
					} else {
						const intervetions = [];
						for (var intervention of data.cropInteventions) {
							intervetions.push({
								interventionId: intervention.interventionId,
                about: intervention.about,
                whyIsImportant: intervention.whyIsImportant,
                cropName: intervention.cropName,
                image: intervention.image,
                interventionName: intervention.interventionName,
                whatIdDoes: intervention.whatIdDoes,
                whyAndWhereItOccours: intervention.whyAndWhereItOccours,
                howToIdentify: intervention.howToIdentify,
                howToManage: intervention.howToManage,
							});


						}

						return intervetions;
					}
				}),
				tap(data => {
          console.log(data),
					this._intervention.next(data);
				})
			);
	}

	// addIntervention(name: string, information: string) {
	// 	let genId: string;
	// 	const newCropTip = {
	// 		cropName: name,

	// 		information: information
	// 	};
	// 	return this.http
	// 		.post<any>('http://localhost:5000/api/crop/createTip', newCropTip)
	// 		.pipe(
	// 			take(1),
	// 			switchMap(data => {
	// 				return this.AllcropTips;
	// 			}),
	// 			tap(tips => {
	// 				this._croptips.next(tips);
	// 			})
	// 		);
	// }

	// getIntervention(tipId: string) {
	// 	return this.http
	// 		.get<any>('http://localhost:5000/api/crop/cropTips/' + tipId)
	// 		.pipe(
	// 			take(1),
	// 			map(data => {
	// 				return {
	// 					tipsId: data.tip.id,
	// 					name: data.tip.cropName,
	// 					// type: data.tip.type,

	// 					information: data.tip.information
	// 				};
	// 			})
	// 		);
	// }

	// updateIntervention(id: string, name: string, information: string) {
	// 	let updatedtips: CropTips[];
	// 	return this.AllcropTips.pipe(
	// 		take(1),
	// 		switchMap(tips => {
	// 			if (!tips || tips.length <= 0) {
	// 				return this.fetchAlltips(name);
	// 			} else {
	// 				return of(tips);
	// 			}
	// 		}),
	// 		switchMap(tips => {
	// 			const index = tips.findIndex(p => p.tipsId === id);
	// 			const oldtip = tips[index];

	// 			updatedtips = [...tips];

	// 			updatedtips[index] = {
	// 				tipsId: id,
	// 				name: name,

	// 				information: information
	// 			};

	// 			return this.http.put(
	// 				`https://greenproject-6f3b9-default-rtdb.firebaseio.com/croptips/${id}.json`,
	// 				{ ...updatedtips[index], tipsId: null }
	// 			);
	// 		}),
	// 		tap(() => {
	// 			this._croptips.next(updatedtips);
	// 		})
	// 	);
	// }

	// DeleteIntervention(id: string) {
	// 	return this.http
	// 		.delete('http://localhost:5000/api/crop/cropTips/delete/' + id)
	// 		.pipe(
	// 			take(1),
	// 			switchMap(res => {
	// 				return this.AllcropTips;
	// 			}),
	// 			tap(tips => {
	// 				this._croptips.next(tips.filter(p => p.tipsId !== id));
	// 			})
	// 		);
	// }
}
