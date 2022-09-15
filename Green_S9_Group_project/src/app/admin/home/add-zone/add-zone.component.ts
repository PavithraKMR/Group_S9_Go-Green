import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-add-zone',
	templateUrl: './add-zone.component.html',
	styleUrls: ['./add-zone.component.scss']
})
export class AddZoneComponent implements OnInit {
	constructor(private modelCtrl: ModalController) {}

	ngOnInit() {}

	close() {
    this.modelCtrl.dismiss()
  }
}
