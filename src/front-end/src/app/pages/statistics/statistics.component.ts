import { HttpErrorResponse } from "@angular/common/http";
import { MatIcon } from "@angular/material/icon";
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from "@angular/core";

import { ADTSettings } from "angular-datatables/src/models/settings";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { DataTableDirective, DataTablesModule } from "angular-datatables";

import { BarSeriesOption, ECharts, EChartsOption } from "echarts";
import { NgxEchartsDirective, provideEcharts } from "ngx-echarts";

import { catchError, finalize, forkJoin, Observable, of, Subject, tap } from "rxjs";

import { PanelComponent } from "../../components/panel/panel.component";
import { StatisticsCardsComponent } from "../../components/statistics-cards/statistics-cards.component";

import { PatentStatus } from "../../models/patent";
import { IRecentRequest, IRequests, IStatistics, ITopRanking } from "../../models/statistics";

import { AlertsService } from "../../services/alerts/alerts.service";
import { DtTranslationService } from "../../services/dt-translation/dt-translation.service";
import { TitleService } from "../../services/title/title.service";
import { ReportPeriod, StatisticsService } from "../../services/statistics/statistics.service";

import { getRequestsChartOptions } from "./charts/requests-chart";
import { getStatusChartOptions } from "./charts/status-chart";

import { getRequestsDtOptions } from "../../shared/datatables-options/requests";
import { getTopRankingDtOptions } from "./datatables-options/top-ranking";

@Component({
	selector: "app-statistics",
	standalone: true,
	imports: [
		DataTablesModule,
		MatIcon,
		NgxEchartsDirective,
		PanelComponent,
		StatisticsCardsComponent
	],
	providers: [provideEcharts()],
	templateUrl: "./statistics.component.html",
	styleUrl: "./statistics.component.scss"
})
export class StatisticsComponent implements OnInit, AfterViewInit, OnDestroy {
	@BlockUI()
	private blockUI!: NgBlockUI;

	@ViewChild("holdersTable")
	private dtElementHolders?: DataTableDirective;

	@ViewChild("inventorsTable")
	private dtElementInventors?: DataTableDirective;

	@ViewChild("requestsTable")
	private dtElementRequests?: DataTableDirective;

	@ViewChild("citacoes")
	private citacoes!: TemplateRef<any>;

	@ViewChild("statusColumn")
	private statusColumn!: TemplateRef<any>;

	@ViewChild("detailsBtn")
	private detailsBtn!: TemplateRef<any>;

	public PatentStatus = PatentStatus;

	public dtTriggerHolders: Subject<ADTSettings> = new Subject();
	public dtTriggerInventors: Subject<ADTSettings> = new Subject();
	public dtTriggerRequests: Subject<ADTSettings> = new Subject();
	public dtOptionsHolders!: ADTSettings;
	public dtOptionsInventors!: ADTSettings;
	public dtOptionsRequests!: ADTSettings;

	public status?: IStatistics;
	public requests?: IRequests;
	public topInventors?: ITopRanking[];
	public topHolders?: ITopRanking[];
	public recentRequests?: IRecentRequest[];

	public statusChart?: ECharts;
	public requestsChart?: ECharts;
	public statusChartOptions: EChartsOption = getStatusChartOptions(this);
	public requestsChartOptions: EChartsOption = getRequestsChartOptions();

	constructor (
		private readonly alertsService: AlertsService,
		private readonly dtTranslationService: DtTranslationService,
		private readonly statisticsService: StatisticsService,
		private readonly titleService: TitleService
	) {
		this.titleService.setTitle("Estatísticas");
	}

	public ngOnInit (): void {
		this.blockUI.start("Carregando estatísticas...");
		this.dtOptionsHolders = getTopRankingDtOptions(this.dtTranslationService);
		this.dtOptionsInventors = getTopRankingDtOptions(this.dtTranslationService);
		this.dtOptionsRequests = getRequestsDtOptions(this.dtTranslationService);

		forkJoin([
			this.getStatus(),
			this.getRequests(),
			this.getTopInventors(20),
			this.getTopHolders(20),
			this.getRecentRequests(20)
		]).pipe(
			finalize(() => {
				(this.statusChartOptions.series as BarSeriesOption[])[0].data = [this.status?.PATENTE.EM_ANDAMENTO, this.status?.PROGRAMA.EM_ANDAMENTO];
				(this.statusChartOptions.series as BarSeriesOption[])[1].data = [this.status?.PATENTE.ARQUIVADO, this.status?.PROGRAMA.ARQUIVADO];
				(this.statusChartOptions.series as BarSeriesOption[])[2].data = [this.status?.PATENTE.CONCEDIDO, this.status?.PROGRAMA.CONCEDIDO];
				this.statusChart?.setOption(this.statusChartOptions);

				(this.requestsChartOptions.series as BarSeriesOption[])[0].data = this.requests?.PATENTE.map(r => r.quantidade);
				(this.requestsChartOptions.series as BarSeriesOption[])[1].data = this.requests?.PROGRAMA.map(r => r.quantidade);
				(this.requestsChartOptions.xAxis as any).data = this.requests?.PATENTE.map(r => r.periodo);
				this.requestsChart?.setOption(this.requestsChartOptions);

				this.dtOptionsHolders.data = this.topHolders || [];
				this.dtOptionsInventors.data = this.topInventors || [];
				this.dtOptionsRequests.data = this.recentRequests || [];
				this.rerenderDataTables();

				this.blockUI.stop();
			})
		).subscribe();
	}

	public ngAfterViewInit (): void {
		this.dtOptionsHolders.columns![3].ngTemplateRef = { ref: this.citacoes };
		this.dtOptionsInventors.columns![3].ngTemplateRef = { ref: this.citacoes };
		this.dtOptionsRequests.columns![4].ngTemplateRef = { ref: this.statusColumn };
		this.dtOptionsRequests.columns![5].ngTemplateRef = { ref: this.detailsBtn };
	}

	public ngOnDestroy (): void {
		this.dtTriggerHolders.unsubscribe();
		this.dtTriggerInventors.unsubscribe();
		this.dtTriggerRequests.unsubscribe();
	}

	public getStatus (): Observable<IStatistics | null> {
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

	public getRequests (): Observable<IRequests | null> {
		return this.statisticsService.getRequests(ReportPeriod.Yearly).pipe(
			tap((requests: IRequests) => {
				this.requests = requests;
			}),

			catchError((error: HttpErrorResponse) => {
				this.alertsService.httpErrorAlert(
					"Falha ao Carregar Estatísticas",
					"Não foi possível obter a distribuição anual de patentes.",
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
		const dtInstanceRequests = await this.dtElementRequests?.dtInstance;

		// Destroy the table first
		dtInstanceHolders?.destroy();
		dtInstanceInventors?.destroy();
		dtInstanceRequests?.destroy();

		// Call the dtTrigger to rerender again
		this.dtTriggerHolders.next(this.dtOptionsHolders);
		this.dtTriggerInventors.next(this.dtOptionsInventors);
		this.dtTriggerRequests.next(this.dtOptionsRequests);
	}
}
