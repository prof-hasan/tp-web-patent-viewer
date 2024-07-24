import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { ToastrService } from "ngx-toastr";

import { TitleService } from "../../services/title/title.service";

@Component({
	selector: "app-details",
	standalone: true,
	imports: [],
	templateUrl: "./details.component.html",
	styleUrl: "./details.component.scss"
})
export class DetailsComponent {
	private codigo!: string;

	constructor (
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly toastr: ToastrService,
		private readonly titleService: TitleService
	) {
		const codigo = this.route.snapshot.paramMap.get("codigo");
		if (!codigo) {
			this.router.navigate(["statistics"]);
			this.toastr.warning("Patente ou programa de computador não informado.", "Erro!");
			return;
		}

		this.codigo = codigo;
		this.titleService.setTitle(this.codigo);
	}
}
