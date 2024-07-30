import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";

import { environment } from "../../../environments/environment";
import { IDetailedPatent, IPatent, PatentStatus, PatentType } from "../../models/patent";

export interface IPatentFilters {
	end: Date;
	start: Date;
	code?: string;
	holder?: string;
	inventor?: string;
	status?: PatentStatus[];
	title?: string;
	type?: PatentType;
}

@Injectable({ providedIn: "root" })
export class PatentsService {
	constructor (private readonly http: HttpClient) { }

	public filterPatents (filters: IPatentFilters): Observable<IPatent[]> {
		const params = new HttpParams().appendAll({
			...filters,
			end: filters.end.toISOString().split("T")[0],	// YYYY-MM-DD
			start: filters.end.toISOString().split("T")[0]	// YYYY-MM-DD
		});

		return this.http.get<IPatent[]>(
			`${environment.API_URL}/v1/patents/filter`,
			{ params }
		);
	}

	public getPatentsDetails (code: string): Observable<IDetailedPatent> {
		return this.http.get<IDetailedPatent>(
			`${environment.API_URL}/v1/patents/details/${code}`
		);
	}
}
