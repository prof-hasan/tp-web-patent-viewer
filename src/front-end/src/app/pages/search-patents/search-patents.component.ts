import { HttpErrorResponse } from "@angular/common/http";
import { MatIcon } from "@angular/material/icon";
import { NgIf } from "@angular/common";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { ADTSettings } from "angular-datatables/src/models/settings";
import { NgSelectModule } from "@ng-select/ng-select";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { DataTableDirective, DataTablesModule } from "angular-datatables";

import { finalize, Subject } from "rxjs";

import { PanelComponent } from "../../components/panel/panel.component";
import { IValidations, VisualValidatorComponent } from "../../components/visual-validator/visual-validator.component";

import { IPatent, PatentStatus, PatentType } from "../../models/patent";

import { AlertsService } from "../../services/alerts/alerts.service";
import { DtTranslationService } from "../../services/dt-translation/dt-translation.service";
import { TitleService } from "../../services/title/title.service";
import { IPatentFilters, PatentsService } from "../../services/patents/patents.service";

import { getRequestsDtOptions, RequestDtType } from "../../shared/datatables-options/requests";

@Component({
	selector: "app-search-patents",
	standalone: true,
	imports: [
		DataTablesModule,
		FormsModule,
		MatIcon,
		NgIf,
		NgSelectModule,
		ReactiveFormsModule,
		RouterLink,
		PanelComponent,
		VisualValidatorComponent
	],
	templateUrl: "./search-patents.component.html",
	styleUrl: "./search-patents.component.scss"
})
export class SearchPatentsComponent implements OnInit, AfterViewInit, OnDestroy {
	@BlockUI()
	private blockUI!: NgBlockUI;

	@ViewChild(DataTableDirective)
	private dtElement?: DataTableDirective;

	@ViewChild("statusColumn")
	private statusColumn!: TemplateRef<any>;

	@ViewChild("detailsBtn")
	private detailsBtn!: TemplateRef<any>;

	public PatentStatus = PatentStatus;

	public dtTrigger: Subject<ADTSettings> = new Subject();
	public dtOptions!: ADTSettings;

	public form: FormGroup;
	public validations: IValidations;
	public statusOptions = [
		{ label: "Arquivado", value: PatentStatus.ARQUIVADO },
		{ label: "Em Andamento", value: PatentStatus.EM_ANDAMENTO },
		{ label: "Concedido", value: PatentStatus.CONCEDIDO }
	];
	public results?: IPatent[];

	constructor (
		private readonly route: ActivatedRoute,
		private readonly formBuilder: FormBuilder,
		private readonly alertsService: AlertsService,
		private readonly dtTranslationService: DtTranslationService,
		private readonly patentsService: PatentsService,
		private readonly titleService: TitleService
	) {
		this.titleService.setTitle("Pesquisar Patentes");

		this.form = this.formBuilder.group({
			titulo: [""],
			codigo: [""],
			titular: [""],
			inventor: [""],
			inicio: [new Date(new Date().getFullYear(), 0, 1).toISOString().split("T")[0], Validators.required],
			fim: [new Date().toISOString().split("T")[0], Validators.required],
			status: [this.statusOptions.map(s => s.value), Validators.required]
		});

		this.validations = {
			form: this.form,
			fields: {
				titulo: [],
				codigo: [],
				titular: [],
				inventor: [],
				inicio: [{ key: "required" }],
				fim: [{ key: "required" }],
				status: [{ key: "required" }]
			}
		};

		const holder = this.route.snapshot.paramMap.get("holder");
		const inventor = this.route.snapshot.paramMap.get("inventor");
		if (holder || inventor) {
			this.form.patchValue({
				titular: holder || "",
				inventor: inventor || "",
				inicio: new Date(2000, 0, 1).toISOString().split("T")[0]
			});
			this.search();
		}
	}

	public ngOnInit (): void {
		this.dtOptions = getRequestsDtOptions(this.dtTranslationService, RequestDtType.PATENTS);
	}

	public ngAfterViewInit (): void {
		this.dtOptions.columns![3].ngTemplateRef = { ref: this.statusColumn };
		this.dtOptions.columns![4].ngTemplateRef = { ref: this.detailsBtn };
	}

	public ngOnDestroy (): void {
		this.dtTrigger.unsubscribe();
	}

	public search (): void {
		if (this.form.invalid)
			return;

		const filters: IPatentFilters = {
			end: new Date(this.form.value.fim),
			start: new Date(this.form.value.inicio),
			code: this.form.value.codigo,
			holder: this.form.value.titular,
			inventor: this.form.value.inventor,
			"status[]": this.form.value.status,
			title: this.form.value.titulo,
			type: PatentType.PATENTE
		};

		this.blockUI.start("Pesquisando...");
		this.patentsService.filterPatents(filters)
			.pipe(finalize(() => this.blockUI.stop()))
			.subscribe({
				next: (results: IPatent[]) => {
					this.results = results;
					this.dtOptions.data = results;
					this.rerenderDataTables();
				},
				error: (error: HttpErrorResponse) => {
					this.alertsService.httpErrorAlert(
						"Falha ao Pesquisar",
						"Não foi possível realizar a pesquisa.",
						error
					);
				}
			});
	}

	private async rerenderDataTables (): Promise<void> {
		const dtInstance = await this.dtElement?.dtInstance;

		// Destroy the table first
		dtInstance?.destroy();

		// Call the dtTrigger to rerender again
		this.dtTrigger.next(this.dtOptions);
	}
}
