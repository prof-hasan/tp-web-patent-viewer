import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NavigationEnd, Router, RouterOutlet } from "@angular/router";

import { BlockUIModule } from "ng-block-ui";
import { NgScrollbar, NgScrollbarModule } from "ngx-scrollbar";

import { filter, Subscription } from "rxjs";

import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from "./components/header/header.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		BlockUIModule,
		FooterComponent,
		HeaderComponent,
		RouterOutlet,
		NgScrollbarModule
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss"
})
export class AppComponent implements OnDestroy {
	@ViewChild(NgScrollbar)
	private scrollbar!: NgScrollbar;

	private subscription: Subscription;

	constructor (private readonly router: Router) {
		this.subscription = this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => this.scrollbar.scrollTo({ top: 0 }));
	}

	public ngOnDestroy (): void {
		this.subscription.unsubscribe();
	}
}
