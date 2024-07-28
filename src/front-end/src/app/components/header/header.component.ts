import { Component } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { RouterLink, RouterLinkActive } from "@angular/router";

import { CollapseModule } from "ngx-bootstrap/collapse";

@Component({
	selector: "app-header",
	standalone: true,
	imports: [
		CollapseModule,
		MatIcon,
		RouterLink,
		RouterLinkActive
	],
	templateUrl: "./header.component.html",
	styleUrl: "./header.component.scss"
})
export class HeaderComponent {
	public isMenuCollapsed: boolean = false;
}
