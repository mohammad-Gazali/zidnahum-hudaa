import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, MatFormField, MatInput, MatButton, MatIcon],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  public search = '';

  submit() {
    if (!this.search) return;
    
  }
}
