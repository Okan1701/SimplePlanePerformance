import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { interval, Observable, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from './shared/services/loading.service';
import { Status } from './shared/enums/status.enum';
import { StatusComponent } from './shared/components/status/status.component';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-root',
	imports: [CommonModule, RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive, StatusComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent {
	protected localTimeString = "";
	protected zuluTimeString = "";
	protected readonly Status = Status;

	protected get loadingStatus$(): Observable<Status> {
		return this.loadingService.loadingStatus$;
	}

	constructor(private loadingService: LoadingService) {
		interval(1000).pipe(takeUntilDestroyed(), startWith(0)).subscribe(() => {
			let localDate = new Date();
			this.localTimeString = `${localDate.getHours()}:${localDate.getMinutes()}:${localDate.getSeconds()} LT`;
			this.zuluTimeString = `${localDate.getUTCHours()}:${localDate.getUTCMinutes()}:${localDate.getUTCSeconds()} Z`;
		});
	}
}
