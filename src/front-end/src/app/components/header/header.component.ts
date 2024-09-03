import { MatIcon } from "@angular/material/icon";
import { Component, OnDestroy } from "@angular/core";
import { Location, NgIf } from "@angular/common";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";

import { CollapseModule } from "ngx-bootstrap/collapse";

import { filter, Subscription } from "rxjs";

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
export class HeaderComponent implements OnDestroy {
	public hideBackButton: boolean = true;
	public isMenuCollapsed: boolean = true;

	private subscription: Subscription;

	constructor (
		private readonly location: Location,
		private readonly router: Router
	) {
		this.subscription = this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => this.hideBackButton = this.location.isCurrentPathEqualTo("/statistics"));
	}

	public ngOnDestroy (): void {
		this.subscription.unsubscribe();
	}

	public goBack (): void {
		this.location.back();
	}
}
