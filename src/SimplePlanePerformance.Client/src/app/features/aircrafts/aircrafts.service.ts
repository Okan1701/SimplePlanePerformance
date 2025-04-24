import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Aircraft} from '../../shared/models/aircraft.model';
import {environment} from "../../../environments/environment"
import {Status} from '../../shared/enums/status.enum';
import {Injectable} from '@angular/core';

const endpoint = `${environment.apiUrl}/v1/aircraft`

@Injectable({providedIn: 'root'})
export class AircraftsService {
  private readonly aircraftsSubject = new BehaviorSubject<Aircraft[]>([]);
  private readonly statusSubject = new BehaviorSubject<Status>(Status.None);

  constructor(private readonly httpCLient: HttpClient) {}

  public get status$(): Observable<Status> {
    return this.statusSubject.asObservable();
  }

  public get aircrafts$(): Observable<Aircraft[]> {
    return this.aircraftsSubject.asObservable();
  }

  public loadAircrafts(): void {
    if (this.statusSubject.value === Status.Success) return

    this.statusSubject.next(Status.Loading);
    this.httpCLient.get<Aircraft[]>(endpoint).subscribe(aircrafts => {
      this.aircraftsSubject.next(aircrafts);
      this.statusSubject.next(Status.Success);
    })
  }
}
