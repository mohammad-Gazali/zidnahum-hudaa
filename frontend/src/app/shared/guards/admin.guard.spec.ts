import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { signal } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { adminGuard } from './admin.guard';
import { AuthService } from '../services/auth.service';
import { CurrentUser } from '../types';
import { Group } from '../enums';

function makeRoute(): ActivatedRouteSnapshot {
  return { data: {} } as unknown as ActivatedRouteSnapshot;
}

function makeState(): RouterStateSnapshot {
  return { url: '', root: makeRoute() } as unknown as RouterStateSnapshot;
}

function makeAdminUser(): CurrentUser {
  return { id: 1, username: 'admin', firstName: 'A', lastName: 'B', groups: [], isAdmin: true, isSuperUser: true, isStaff: true };
}

function makeRegularUser(): CurrentUser {
  return { id: 2, username: 'user', firstName: 'U', lastName: 'R', groups: [Group.Memo], isAdmin: false, isSuperUser: false, isStaff: false };
}

describe('adminGuard', () => {
  let currentUserSignal: ReturnType<typeof signal<CurrentUser | null | undefined>>;
  let routerMock: { navigateByUrl: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    currentUserSignal = signal<CurrentUser | null | undefined>(undefined);
    routerMock = { navigateByUrl: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: { currentUser: currentUserSignal.asReadonly() } },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should return true and not navigate for admin users', async () => {
    currentUserSignal.set(makeAdminUser());
    const result$ = TestBed.runInInjectionContext(() =>
      adminGuard(makeRoute(), makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(true);
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should return false and navigate to /login for non-admin users', async () => {
    currentUserSignal.set(makeRegularUser());
    const result$ = TestBed.runInInjectionContext(() =>
      adminGuard(makeRoute(), makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should return false and navigate to /login for unauthenticated users', async () => {
    currentUserSignal.set(null);
    const result$ = TestBed.runInInjectionContext(() =>
      adminGuard(makeRoute(), makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
