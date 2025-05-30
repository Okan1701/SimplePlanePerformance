import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Metar } from '../models/metar.model';
import { map, Observable } from 'rxjs';

const endpoint = `${environment.apiUrl}/v1/metar`

@Injectable({providedIn: 'root'})
export class MetarService {
	constructor(private httpClient: HttpClient) {}

	public getMetarForStation(station: string): Observable<Metar> {
		return this.httpClient.get<Metar>(`${endpoint}/${station}`).pipe(
			map(x => this.mapObjectTypes(x))
		);
	}

	private mapObjectTypes(metar: Metar): Metar {
		metar.observed = new Date(metar.observed as unknown as string);
		return metar;
	}
}
