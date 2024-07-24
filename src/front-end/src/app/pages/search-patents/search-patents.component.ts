import { Component } from "@angular/core";
import { TitleService } from "../../services/title/title.service";

@Component({
	selector: "app-search-patents",
	standalone: true,
	imports: [],
	templateUrl: "./search-patents.component.html",
	styleUrl: "./search-patents.component.scss"
})
export class SearchPatentsComponent {
	constructor (private readonly titleService: TitleService) {
		this.titleService.setTitle("Pesquisar Patentes");
	}
}
