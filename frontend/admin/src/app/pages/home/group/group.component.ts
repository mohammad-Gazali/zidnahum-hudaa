import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,  
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { Group } from '../../../services/groups.service';

@Component({
  selector: 'app-home-group',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatIcon,
    MatDivider,
    RouterLink,
  ],
  templateUrl: './group.component.html',
  styleUrl: './group.component.scss',
})
export class HomeGroupComponent {
  public group = input.required<Group>();
}
