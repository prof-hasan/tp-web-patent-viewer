import { Component } from "@angular/core";
import { TitleService } from "../../services/title/title.service";

@Component({
	selector: "app-search-softwares",
	standalone: true,
	imports: [],
	templateUrl: "./search-softwares.component.html",
	styleUrl: "./search-softwares.component.scss"
})
export class SearchSoftwaresComponent {
	constructor (private readonly titleService: TitleService) {
		this.titleService.setTitle("Pesquisar Programas de Computador");
	}
}
