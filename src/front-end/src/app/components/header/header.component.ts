import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { Location, NgIf } from "@angular/common";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";

import { CollapseModule } from "ngx-bootstrap/collapse";

import { filter } from "rxjs";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		CollapseModule,
		MatIcon,
		NgIf,
		RouterLink,
		RouterLinkActive
	],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss"
})
export class HeaderComponent {
	public hideBackButton: boolean = true;
	public isMenuCollapsed: boolean = true;

	constructor (
		private readonly location: Location,
		private readonly router: Router
	) {
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => this.hideBackButton = this.location.isCurrentPathEqualTo("/statistics"));
	}

	public goBack (): void {
		this.location.back();
	}
}
