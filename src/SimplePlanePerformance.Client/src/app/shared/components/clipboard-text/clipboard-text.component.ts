import {Component, ElementRef, ViewChild} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-clipboard-text',
  imports: [MatIconModule, CommonModule],
  templateUrl: './clipboard-text.component.html',
  styleUrl: './clipboard-text.component.scss'
})
export class ClipboardTextComponent {
	@ViewChild('content', {static: false}) protected content?: ElementRef<HTMLElement>;


	constructor(private matSnackBar: MatSnackBar) {
	}

	protected async onClick(): Promise<void> {
		console.log(this.content)
		if (this.content && this.content.nativeElement.innerText) {
			try {
				await navigator.clipboard.writeText(this.content.nativeElement.innerText);
				this.matSnackBar.open("Text copied to clipboard",undefined,  {
					duration: 3000
				});
			}
			catch (error) {
				console.error("Failed to copy to clipboard.", error);
				this.matSnackBar.open("Failed to copy text to clipboard.",undefined,  {
					duration: 3000
				});
			}
		}
	}
}
