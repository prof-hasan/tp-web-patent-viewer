import { Component } from "@angular/core";
import { TitleService } from "../../services/title/title.service";

@Component({
	selector: "app-statistics",
	standalone: true,
	imports: [],
	templateUrl: "./statistics.component.html",
	styleUrl: "./statistics.component.scss"
})
export class StatisticsComponent {
	constructor (private readonly titleService: TitleService) {
		this.titleService.setTitle("Estatísticas");
	}
}
