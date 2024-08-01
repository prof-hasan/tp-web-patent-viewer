import { HttpErrorResponse } from "@angular/common/http";
import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ADTSettings } from "angular-datatables/src/models/settings";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { DataTableDirective, DataTablesModule } from "angular-datatables";

import { catchError, finalize, forkJoin, Observable, of, Subject, tap } from "rxjs";

import { PanelComponent } from "../../components/panel/panel.component";

import { IRecentRequest, IStatistics, ITopRanking } from "../../models/statistics";

import { AlertsService } from "../../services/alerts/alerts.service";
import { DtTranslationService } from "../../services/dt-translation/dt-translation.service";
import { StatisticsService } from "../../services/statistics/statistics.service";
import { TitleService } from "../../services/title/title.service";

@Component({
	selector: "app-statistics",
	standalone: true,
	imports: [
		DataTablesModule,
		PanelComponent
	],
	templateUrl: "./statistics.component.html",
	styleUrl: "./statistics.component.scss"
})
export class StatisticsComponent implements OnInit, AfterViewInit {
	@BlockUI()
	private blockUI!: NgBlockUI;

	@ViewChild("holdersTable")
	private dtElementHolders?: DataTableDirective;

	@ViewChild("inventorsTable")
	private dtElementInventors?: DataTableDirective;

	@ViewChild("citacoes")
	private citacoes!: TemplateRef<any>;

	public dtTriggerHolders: Subject<ADTSettings> = new Subject();
	public dtTriggerInventors: Subject<ADTSettings> = new Subject();
	public dtOptionsHolders!: ADTSettings;
	public dtOptionsInventors!: ADTSettings;

	public status?: IStatistics;
	public topInventors?: ITopRanking[];
	public topHolders?: ITopRanking[];
	public recentRequests?: IRecentRequest[];

	constructor (
		private readonly alertsService: AlertsService,
		private readonly dtTranslationService: DtTranslationService,
		private readonly statisticsService: StatisticsService,
		private readonly titleService: TitleService
	) {
		this.titleService.setTitle("Estatísticas");
	}

	public ngOnInit (): void {
		this.dtOptionsHolders = this.getTopRankingDtOptions();
		this.dtOptionsInventors = this.getTopRankingDtOptions();

		this.blockUI.start("Carregando estatísticas...");
		forkJoin([
			this.getStatistics(),
			this.getTopInventors(20),
			this.getTopHolders(20),
			this.getRecentRequests(20)
		]).pipe(
			finalize(() => {
				this.blockUI.stop();
				console.log(this.status);
				console.log(this.topInventors);
				console.log(this.topHolders);
				console.log(this.recentRequests);

				this.dtOptionsHolders.data = this.topHolders || [];
				this.dtOptionsInventors.data = this.topInventors || [];
				this.rerenderDataTables();
			})
		).subscribe();
	}

	public ngAfterViewInit (): void {
		this.dtOptionsHolders.columns![3].ngTemplateRef = { ref: this.citacoes };
		this.dtOptionsInventors.columns![3].ngTemplateRef = { ref: this.citacoes };
	}

	public getStatistics (): Observable<IStatistics | null> {
		return this.statisticsService.getStatus().pipe(
			tap((status: IStatistics) => {
				this.status = status;
			}),

			catchError((error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Falha ao Carregar Estatísticas",
					"Não foi possível obter o status das patentes.",
					error
				);
				return of(null);
			})
		);
	}

	public getTopInventors (size: number): Observable<ITopRanking[] | null> {
		return this.statisticsService.getTopInventors(size).pipe(
			tap((topInventors: ITopRanking[]) => {
				this.topInventors = topInventors;
			}),

			catchError((error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Falha ao Carregar Estatísticas",
					"Não foi possível obter os principais inventores e criadores.",
					error
				);
				return of(null);
			})
		);
	}

	public getTopHolders (size: number): Observable<ITopRanking[] | null> {
		return this.statisticsService.getTopHolders(size).pipe(
			tap((topHolders: ITopRanking[]) => {
				this.topHolders = topHolders;
			}),

			catchError((error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Falha ao Carregar Estatísticas",
					"Não foi possível obter o principais titulares.",
					error
				);
				return of(null);
			})
		);
	}

	public getRecentRequests (size: number): Observable<IRecentRequest[] | null> {
		return this.statisticsService.getRecentRequests(size).pipe(
			tap((recentRequests: IRecentRequest[]) => {
				this.recentRequests = recentRequests;
			}),

			catchError((error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Falha ao Carregar Estatísticas",
					"Não foi possível obter as solicitações mais recentes.",
					error
				);
				return of(null);
			})
		);
	}

	private async rerenderDataTables (): Promise<void> {
		const dtInstanceHolders = await this.dtElementHolders?.dtInstance;
		const dtInstanceInventors = await this.dtElementInventors?.dtInstance;

		// Destroy the table first
		dtInstanceHolders?.destroy();
		dtInstanceInventors?.destroy();

		// Call the dtTrigger to rerender again
		this.dtTriggerHolders.next(this.dtOptionsHolders);
		this.dtTriggerInventors.next(this.dtOptionsInventors);
	}

	private getTopRankingDtOptions (): ADTSettings {
		return {
			lengthMenu: [5, 10, 20],
			stateSave: true,
			language: this.dtTranslationService.getDataTablesPortugueseTranslation(),
			columns: [{
				title: "Ranking",
				data: "ranking",
				ngPipeInstance: {
					transform: (value: string) => (value[0] === "#" ? value : `#${value}`)
				},
				className: "p-2 w-auto text-center align-middle"
			}, {
				title: "Nome",
				data: "nomeVisualizacao",
				className: "p-2 w-auto align-middle"
			}, {
				title: "Qtd. Citações",
				data: "citacoes",
				className: "p-2 w-auto align-middle"
			}, {
				title: "Aparece Em",
				data: null,
				defaultContent: "",
				className: "p-1 align-middle",
				width: "225px",
				orderable: false,
				searchable: false
			}],
			data: [],
			order: [[0, "asc"]]
		};
	}
}
