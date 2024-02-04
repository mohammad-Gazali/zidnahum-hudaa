import { ChangeDetectionStrategy, Component, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AccountsService } from '../../services/api/accounts/accounts.service';
import { Router } from '@angular/router';
import { TranslateService } from '../../services/translate.service';
import { SnackbarService } from '../../services/snackbar.service';
import { type Subscription } from 'rxjs';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    TranslatePipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnDestroy {
  private accounts = inject(AccountsService);
  private snackbar = inject(SnackbarService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  public loading = inject(LoadingService).loading;

  username = '';
  password = '';
  subscriptions: Subscription[] = [];

  submit() {
    this.loading.set(true);
    const subscription = this.accounts.tokenObtainPair({
      username: this.username,
      password: this.password,
    }).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access);
        localStorage.setItem('refresh-token', res.refresh);

        const subscription = this.accounts.userDetails().subscribe({
          next: (res) => {
            this.accounts.details.set(res);

            this.snackbar.open('تم تسجيل الدخول بنجاح')

            this.router.navigateByUrl('/');
            
            this.loading.set(false);
          },
          error: ({ status, error: { detail } }: { status: number; error: { detail: string } }) => {
            if (status === 401) {
              if (location.pathname !== '/login') {
                this.router.navigateByUrl('login')
              }
    
            } else {
              this.snackbar.open(this.translateService.translate(detail))
            }
            this.loading.set(false);
          }
        })

        this.subscriptions.push(subscription);
      },
      error: ({ error: { detail } }) => {
        this.snackbar.open(this.translateService.translate(detail))
        this.loading.set(false);
      }
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
