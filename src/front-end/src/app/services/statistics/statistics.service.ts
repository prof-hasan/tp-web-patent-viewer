import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { IRecentRequest, IRequests, IStatistics, ITopRanking } from "../../models/statistics";

export enum ReportPeriod {
	Yearly = "yearly",
	Monthly = "monthly"
}

@Injectable({ providedIn: "root" })
export class StatisticsService {
	constructor (private readonly http: HttpClient) { }

	public getStatus (): Observable<IStatistics> {
		return this.http.get<IStatistics>(
			`${environment.API_URL}/v1/statistics/status`
		);
	}

	public getRequests (period: ReportPeriod): Observable<IRequests> {
		return this.http.get<IRequests>(
			`${environment.API_URL}/v1/statistics/requests/${period}`
		);
	}

	public getTopInventors (size: number): Observable<ITopRanking[]> {
		return this.http.get<ITopRanking[]>(
			`${environment.API_URL}/v1/statistics/top-inventors/${size}`
		);
	}

	public getTopHolders (size: number): Observable<ITopRanking[]> {
		return this.http.get<ITopRanking[]>(
			`${environment.API_URL}/v1/statistics/top-holders/${size}`
		);
	}

	public getRecentRequests (size: number): Observable<IRecentRequest[]> {
		return this.http.get<IRecentRequest[]>(
			`${environment.API_URL}/v1/statistics/recent-requests/${size}`
		);
	}
}
