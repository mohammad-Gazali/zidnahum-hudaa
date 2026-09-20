import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { signal } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { groupGuard } from './group.guard';
import { AuthService } from '@shared';
import { CurrentUser } from '@shared';
import { Group } from '@shared';

function makeUser(groups: Group[] = [], isAdmin = false): CurrentUser {
  return { id: 1, username: 'user', firstName: 'U', lastName: 'R', groups, isAdmin, isSuperUser: isAdmin, isStaff: isAdmin };
}

function makeRoute(data: Record<string, unknown>): ActivatedRouteSnapshot {
  return { data } as unknown as ActivatedRouteSnapshot;
}

function makeState(): RouterStateSnapshot {
  return { url: '', root: makeRoute({}) } as unknown as RouterStateSnapshot;
}

describe('groupGuard', () => {
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

  it('should return true for admin users regardless of groups', async () => {
    currentUserSignal.set(makeUser([], true));
    const route = makeRoute({ group: Group.Reports });
    const result$ = TestBed.runInInjectionContext(() =>
      groupGuard(route, makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(true);
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should return true when user has the required group', async () => {
    currentUserSignal.set(makeUser([Group.Memo, Group.Coming]));
    const route = makeRoute({ group: Group.Memo });
    const result$ = TestBed.runInInjectionContext(() =>
      groupGuard(route, makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(true);
    expect(routerMock.navigateByUrl).not.toHaveBeenCalled();
  });

  it('should return false and navigate to /login when user lacks the required group', async () => {
    currentUserSignal.set(makeUser([Group.Coming]));
    const route = makeRoute({ group: Group.Memo });
    const result$ = TestBed.runInInjectionContext(() =>
      groupGuard(route, makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should return false and navigate to /login for unauthenticated users', async () => {
    currentUserSignal.set(null);
    const route = makeRoute({ group: Group.Memo });
    const result$ = TestBed.runInInjectionContext(() =>
      groupGuard(route, makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should handle empty route data gracefully', async () => {
    currentUserSignal.set(makeUser([Group.Memo]));
    const route = makeRoute({});
    const result$ = TestBed.runInInjectionContext(() =>
      groupGuard(route, makeState()),
    ) as Observable<boolean>;
    const result = await firstValueFrom(result$);
    expect(result).toBe(false);
  });
});
