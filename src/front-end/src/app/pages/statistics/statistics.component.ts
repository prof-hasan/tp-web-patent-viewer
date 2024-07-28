import { Component } from "@angular/core";

import { BlockUI, NgBlockUI } from "ng-block-ui";

import { PanelComponent } from "../../components/panel/panel.component";

import { TitleService } from "../../services/title/title.service";

@Component({
	selector: "app-statistics",
	standalone: true,
	imports: [
		PanelComponent
	],
	templateUrl: "./statistics.component.html",
	styleUrl: "./statistics.component.scss"
})
export class StatisticsComponent {
	@BlockUI()
	private blockUI!: NgBlockUI;

	public collapsed = {
		statistics: false
	};

	constructor (private readonly titleService: TitleService) {
		this.titleService.setTitle("Estatísticas");
	}
}
