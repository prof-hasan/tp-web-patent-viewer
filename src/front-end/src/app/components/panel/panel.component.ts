import { MatIcon } from "@angular/material/icon";
import { Component, Input } from "@angular/core";

import { CollapseModule } from "ngx-bootstrap/collapse";

@Component({
	selector: "app-panel",
	standalone: true,
	imports: [
		CollapseModule,
		MatIcon
	],
	templateUrl: "./panel.component.html",
	styleUrl: "./panel.component.scss"
})
export class PanelComponent {
	@Input()
	public header: string = "";

	public collapsed: boolean = false;
}
