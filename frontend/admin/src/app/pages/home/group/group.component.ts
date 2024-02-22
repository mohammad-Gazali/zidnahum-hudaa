import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Group } from '../../../services/groups.service';

@Component({
  selector: 'app-home-group',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatDividerModule, RouterLink],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class HomeGroupComponent {
  public group = input.required<Group>();
}
