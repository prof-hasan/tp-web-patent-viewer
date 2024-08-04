import { HttpErrorResponse } from "@angular/common/http";
import { MatIcon } from "@angular/material/icon";
import { ActivatedRoute, Router } from "@angular/router";
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { DatePipe, NgFor, NgIf } from "@angular/common";

import { ADTSettings } from "angular-datatables/src/models/settings";
import { ToastrService } from "ngx-toastr";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { DataTableDirective, DataTablesModule } from "angular-datatables";

import { finalize, Subject } from "rxjs";

import { LanguageComponent } from "../../components/language/language.component";
import { PanelComponent } from "../../components/panel/panel.component";

import { IDetailedPatent, PatentStatus, PatentType } from "../../models/patent";

import { AlertsService } from "../../services/alerts/alerts.service";
import { DtTranslationService } from "../../services/dt-translation/dt-translation.service";
import { PatentsService } from "../../services/patents/patents.service";
import { TitleService } from "../../services/title/title.service";

import { getDispatchDtOptions } from "./datatables-options/dispatch";

@Component({
	selector: "app-details",
	standalone: true,
	imports: [
		DataTablesModule,
		DatePipe,
		LanguageComponent,
		MatIcon,
		NgFor,
		NgIf,
		PanelComponent
	],
	templateUrl: "./details.component.html",
	styleUrl: "./details.component.scss"
})
export class DetailsComponent implements OnInit, AfterViewInit, OnDestroy {
	@BlockUI()
	private blockUI!: NgBlockUI;

	@ViewChild(DataTableDirective)
	private dtElement?: DataTableDirective;

	@ViewChild("commentBtn")
	private commentBtn!: TemplateRef<any>;

	public dtTrigger: Subject<ADTSettings> = new Subject();
	public dtOptions!: ADTSettings;

	public PatentStatus = PatentStatus;
	public PatentType = PatentType;
	public header: string = "Carregando dados...";
	public patent?: IDetailedPatent;

	private codigo!: string;

	constructor (
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly alertsService: AlertsService,
		private readonly dtTranslationService: DtTranslationService,
		private readonly patentsService: PatentsService,
		private readonly titleService: TitleService,
		private readonly toastr: ToastrService
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

	public ngOnInit (): void {
		this.dtOptions = getDispatchDtOptions(this.dtTranslationService);

		this.blockUI.start("Carregando detalhes...");
		this.patentsService.getPatentsDetails(this.codigo)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe({
				next: (patent: IDetailedPatent) => {
					if (patent.tipo === PatentType.PATENTE)
						this.header = "Detalhes da Patente";
					else if (patent.tipo === PatentType.PROGRAMA)
						this.header = "Detalhes do Programa";

					this.patent = patent;
					this.dtOptions.data = patent.despachosPatente;
					this.rerenderDataTables();
				},
				error: (error: HttpErrorResponse) => {
					if (error.status === 404) {
						this.router.navigate(["statistics"]);
						this.toastr.warning("Patente ou programa de computador não encontrado.", "Erro!", { timeOut: 7000 });
					} else {
						this.alertsService.httpErrorAlert(
							"Falha ao Pesquisar",
							"Não foi possível obter os detalhes da patente ou programa.",
							error
						);
					}
				}
			});
	}

	public ngAfterViewInit (): void {
		this.dtOptions.columns![5].ngTemplateRef = { ref: this.commentBtn };
	}

	public ngOnDestroy (): void {
		this.dtTrigger.unsubscribe();
	}

	public showComment (comment: string): void {
		this.alertsService.show("Comentário do Despacho", comment);
	}

	private async rerenderDataTables (): Promise<void> {
		const dtInstance = await this.dtElement?.dtInstance;

		// Destroy the table first
		dtInstance?.destroy();

		// Call the dtTrigger to rerender again
		this.dtTrigger.next(this.dtOptions);
	}
}
