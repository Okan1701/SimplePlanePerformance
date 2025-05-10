import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { interval, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbar, MatIconModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
	protected localTimeString = "";
	protected zuluTimeString = "";

	constructor() {
		interval(1000).pipe(takeUntilDestroyed(), startWith(0)).subscribe(() => {
			let localDate = new Date();
			this.localTimeString = `${localDate.getHours()}:${localDate.getMinutes()}:${localDate.getSeconds()} LT`;
			this.zuluTimeString = `${localDate.getUTCHours()}:${localDate.getUTCMinutes()}:${localDate.getUTCSeconds()} Z`;
		});
	}

}
