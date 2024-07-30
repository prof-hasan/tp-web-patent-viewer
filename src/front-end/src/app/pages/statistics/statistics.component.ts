import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";

import { BlockUI, NgBlockUI } from "ng-block-ui";

import { catchError, finalize, forkJoin, Observable, of, tap } from "rxjs";

import { PanelComponent } from "../../components/panel/panel.component";

import { IRecentRequest, IStatistics, ITopRanking } from "../../models/statistics";

import { AlertsService } from "../../services/alerts/alerts.service";
import { StatisticsService } from "../../services/statistics/statistics.service";
import { TitleService } from "../../services/title/title.service";

@Component({
	selector: "app-statistics",
	standalone: true,
	imports: [
		PanelComponent
	],
	templateUrl: "./statistics.component.html",
	styleUrl: "./statistics.component.scss"
})
export class StatisticsComponent implements OnInit {
	@BlockUI()
	private blockUI!: NgBlockUI;

	public status?: IStatistics;
	public topInventors?: ITopRanking[];
	public topHolders?: ITopRanking[];
	public recentRequests?: IRecentRequest[];

	constructor (
		private readonly alertsService: AlertsService,
		private readonly statisticsService: StatisticsService,
		private readonly titleService: TitleService
	) {
		this.titleService.setTitle("Estatísticas");
	}

	public ngOnInit (): void {
		this.blockUI.start("Carregando estatísticas...");
		forkJoin([
			this.getStatistics(),
			this.getTopInventors(5),
			this.getTopHolders(5),
			this.getRecentRequests(5)
		]).pipe(
			finalize(() => {
				this.blockUI.stop();
				console.log(this.status);
				console.log(this.topInventors);
				console.log(this.topHolders);
				console.log(this.recentRequests);
			})
		).subscribe();
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
}
