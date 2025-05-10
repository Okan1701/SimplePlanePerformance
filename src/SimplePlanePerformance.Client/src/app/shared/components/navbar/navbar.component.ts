import { Component } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatIconModule } from '@angular/material/icon';
import { interval, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navbar',
    imports: [
        MatIconModule,
        MatToolbarModule,
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
	protected localTimeString = "";
	protected zuluTimeString = "";

	constructor() {
		interval(1000).pipe(takeUntilDestroyed(), startWith(0)).subscribe(() => {
			let localDate = new Date();
			this.localTimeString = `${String(localDate.getHours()).padStart(2, "0")}:${String(localDate.getMinutes()).padStart(2, "0")}:${String(localDate.getSeconds()).padStart(2, "0")} LT`;
			this.zuluTimeString = `${String(localDate.getUTCHours()).padStart(2, "0")}:${String(localDate.getUTCMinutes()).padStart(2, "0")}:${String(localDate.getUTCSeconds()).padStart(2, "0")} Z`;
		});
	}
}
