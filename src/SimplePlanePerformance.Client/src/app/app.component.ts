import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { LoadingService } from './shared/services/loading.service';
import { Status } from './shared/enums/status.enum';
import { StatusComponent } from './shared/components/status/status.component';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
	selector: 'app-root',
	imports: [CommonModule, RouterOutlet, MatIconModule, MatButtonModule, StatusComponent, NavbarComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
	protected readonly Status = Status;

	protected get loadingStatus$(): Observable<Status> {
		return this.loadingService.loadingStatus$;
	}

	constructor(private loadingService: LoadingService, private router: Router) {
	}

	public async ngOnInit() {
		await this.router.navigate(["newflight"]);
	}
}
