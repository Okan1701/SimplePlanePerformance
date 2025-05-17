import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../shared/services/loading.service';
import { Status } from '../../shared/enums/status.enum';
import { NewflightInputComponent } from './newflight-input/newflight-input.component';
import { NewflightOutputComponent } from './newflight-output/newflight-output.component';

@Component({
  selector: 'app-newflight',
	imports: [
		NewflightInputComponent,
		NewflightOutputComponent
	],
  templateUrl: './newflight.component.html',
  styleUrl: './newflight.component.scss'
})
export class NewflightComponent implements OnInit {

	constructor(private loadingService: LoadingService) {}

	public ngOnInit() {
		this.loadingService.setLoadingStatus(Status.Success);
	}
}
