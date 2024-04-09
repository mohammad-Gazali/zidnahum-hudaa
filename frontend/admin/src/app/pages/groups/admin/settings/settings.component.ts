import { Component, DestroyRef, effect, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatCard } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput } from '@angular/material/chips';
import { MatIcon } from '@angular/material/icon';
import { finalize } from 'rxjs';
import { ExtraService } from '../../../../services/api/admin/services';
import { TranslatePipe } from '../../../../pipes/translate.pipe';
import { LOADING } from '../../../../tokens/loading.token';
import { SnackbarService } from '../../../../services/snackbar.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatLabel,
    MatError,
    MatInput,
    MatCheckbox,
    MatButton,
    MatChipGrid,
    MatChipRow,
    MatChipRemove,
    MatChipInput,
    MatIcon,
    TranslatePipe,
  ],
})
export class SettingsComponent {
  private extra = inject(ExtraService);
  private fb = inject(NonNullableFormBuilder);
  private snackbar = inject(SnackbarService);
  private destroyRef = inject(DestroyRef);
  public loading = inject(LOADING);

  public settings = toSignal(this.extra.extraControlSettingsList());
  public form = this.fb.group({
    event_title: this.fb.control<string | undefined>(undefined),
    point_value: this.fb.control<number | undefined>(undefined, [
      Validators.required,
    ]),
    double_points: this.fb.control<boolean>(false, [
      Validators.required,
    ]),
    hidden_ids: this.fb.array<FormControl<number>>([]),
  });

  constructor() {
    effect(() => {
      const settings = this.settings();

      if (settings) {
        this.form.enable();
        this.form.controls.event_title.setValue(settings.event_title ?? '');
        this.form.controls.point_value.setValue(settings.point_value);
        this.form.controls.double_points.setValue(
          settings.double_points ?? false
        );
        (settings.hidden_ids as number[]).forEach((id) => {
          this.form.controls.hidden_ids.push(this.fb.control(id));
        });
      } else {
        this.form.disable();
      }
    });
  }

  submit() {
    if (!this.form.valid || this.loading()) return;

    this.loading.set(true);

    this.extra
      .extraControlSettingsUpdate(this.form.value as any)
      .pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false)))
      .subscribe(() => {
        this.snackbar.success('تم التعديل بنجاح');
      });
  }

  addId(event: MatChipInputEvent) {
    if (!event.value) return;

    this.form.controls.hidden_ids.push(
      this.fb.control(parseInt(event.value))
    );

    event.chipInput.clear();
  }
}
