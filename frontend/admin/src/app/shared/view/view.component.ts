import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import { Field, ViewComponentConfig } from './view.component.interface';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { LoadingService } from '../../services/loading.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [MatDividerModule, TranslatePipe],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewComponent<T> implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private snackbar = inject(SnackbarService);
  private loading = inject(LoadingService);

  private destroyed$ = new Subject<void>();
  public viewId!: string;
  public fields = signal<Field[]>([]);

  @Input({ required: true }) public config!: ViewComponentConfig<T>;

  ngOnInit(): void {
    this.loading.loading.set(true);

    const routeId = this.route.snapshot.paramMap.get('id');

    if (routeId === null) {
      this.snackbar.open('يجب تواجد المعرف في الرابط');
      this.router.navigateByUrl('/');

      this.loading.loading.set(false);
      return;
    }

    this.viewId = routeId;

    this.config
      .viewFunc(routeId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((res) => {
        this.loading.loading.set(false);
        this.fields.set(
          Object.entries<any>(res as { [key: string]: any }).map(
            ([name, value]) => ({
              name,
              value,
              type: (this.config.fieldsInfo as any)[name]?.type ?? 'string'
            })
          )
        );
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
  }
}
