import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

import { BlockUIModule } from "ng-block-ui";
import { NgScrollbarModule } from "ngx-scrollbar";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		BlockUIModule,
		// FooterComponent,
		// HeaderComponent,
		RouterOutlet,
		NgScrollbarModule
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss"
})
export class AppComponent { }
