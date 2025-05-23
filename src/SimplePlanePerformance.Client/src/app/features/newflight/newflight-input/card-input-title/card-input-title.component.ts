import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-card-input-title',
    imports: [
        MatIcon,
		MatTooltipModule
    ],
  templateUrl: './card-input-title.component.html',
  styleUrl: './card-input-title.component.scss'
})
export class CardInputTitleComponent {
	@Input()
	public isSuccess = false;
}
