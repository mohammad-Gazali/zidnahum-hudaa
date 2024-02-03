import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatButtonModule } from '@angular/material/button';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, TranslatePipe, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  private accounts = inject(AccountsService);
  private router = inject(Router);

  public title = 'Zidnahum Hudaa Dashboard';
  public isAuth = computed(() => {
    return this.accounts.details() !== null
  });
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.accounts.details.set(null);
    this.router.navigateByUrl('login');
  }
}
