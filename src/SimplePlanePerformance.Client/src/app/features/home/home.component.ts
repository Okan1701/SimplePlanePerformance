import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { Router } from '@angular/router';
import { Status } from '../../shared/enums/status.enum';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
	constructor(private loadingService: LoadingService, private router: Router) {
	}

	public async ngOnInit() {
		this.loadingService.setLoadingStatus(Status.Success);
		// Redirect to different page until home page is actually finished
		await this.router.navigate(['newflight']);
	}
}
