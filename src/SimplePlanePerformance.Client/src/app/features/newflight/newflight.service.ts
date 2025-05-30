import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NewFlightService {
	private readonly departureIcaoSubject = new BehaviorSubject<string>('');
	private readonly destinationIcaoSubject = new BehaviorSubject<string>('');

	public get departureIcao$(): Observable<string> {
		return this.departureIcaoSubject.asObservable();
	}

	public get departureIcao(): string {
		return this.departureIcaoSubject.value;
	}

	public set departureIcao(value: string) {
		this.departureIcaoSubject.next(value);
	}

	public get destinationIcao$(): Observable<string> {
		return this.destinationIcaoSubject.asObservable();
	}

	public get destinationIcao(): string {
		return this.destinationIcaoSubject.value;
	}

	public set destinationIcao(value: string) {
		this.destinationIcaoSubject.next(value);
	}
}
