import { Component, EventEmitter, Input, Output } from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-card-input-title',
    imports: [
        MatIcon,
		MatTooltipModule,
		MatButtonModule,
		MatTooltipModule
    ],
  templateUrl: './card-input-title.component.html',
  styleUrl: './card-input-title.component.scss'
})
export class CardInputTitleComponent {
	@Input()
	public isSuccess = false;

	@Output()
	public resetClicked = new EventEmitter<void>();
	@Output()
	public saveClicked = new EventEmitter<void>();
	@Output()
	public historyClicked = new EventEmitter<void>();

	protected reset(): void {
		this.resetClicked.emit();
	}

	protected save(): void {
		this.saveClicked.emit();
	}

	protected history(): void {
		this.historyClicked.emit();
	}
}
