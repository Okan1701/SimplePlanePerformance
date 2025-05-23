import {Component, Input} from '@angular/core';
import {Status} from '../../enums/status.enum';
import {CommonModule} from '@angular/common';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-status',
  imports: [CommonModule, MatProgressSpinner, MatIcon],
  templateUrl: './status.component.html',
  styleUrl: './status.component.scss'
})
export class StatusComponent {
  @Input()
  public status: Status | null = Status.None;
  protected readonly Status = Status;
}
