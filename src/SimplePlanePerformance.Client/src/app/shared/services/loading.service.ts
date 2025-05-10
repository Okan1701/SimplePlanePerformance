import { Injectable } from '@angular/core';
import { Status } from '../enums/status.enum';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoadingService {
	private loadingStatusSubject = new BehaviorSubject<Status>(Status.None);

	public get loadingStatus$(): Observable<Status> {
		return this.loadingStatusSubject.asObservable();
	}

	public setLoadingStatus(status: Status) {
		this.loadingStatusSubject.next(status);
	}
}
