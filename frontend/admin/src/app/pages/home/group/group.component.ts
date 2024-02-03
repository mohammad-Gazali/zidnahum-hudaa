import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Group } from '../groups';

@Component({
  selector: 'app-home-group',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDividerModule, RouterLink],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeGroupComponent {
  @Input({ required: true }) group!: Group;
}
