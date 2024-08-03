import { Component, Input } from "@angular/core";

import { IStatisticsCount } from "../../models/statistics";

@Component({
	selector: "app-statistics-cards",
	standalone: true,
	imports: [],
	templateUrl: "./statistics-cards.component.html",
	styleUrl: "./statistics-cards.component.scss"
})
export class StatisticsCardsComponent {
	@Input()
	public header: string = "";

	@Input()
	public statistics?: IStatisticsCount;

	public getPercentage (count?: number): string {
		if (!this.statistics || count === undefined)
			return "0%";

		const total = this.statistics.ARQUIVADO + this.statistics.CONCEDIDO + this.statistics.EM_ANDAMENTO;
		return `${((count / total) * 100).toFixed(2)}%`.replace(".", ",");
	}
}
