import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { AccountsService } from './api/accounts';
import { SnackbarService } from './snackbar.service';
import { Router } from '@angular/router';
import { UserSerilizer } from './api/models';

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear: () => store.clear(),
    getItem: (key: string) => store.get(key) ?? null,
    key: (index: number) => [...store.keys()][index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, String(value));
    },
  };
}

/** Angular's unit-test jsdom environment does not expose localStorage. */
if (typeof globalThis.localStorage === 'undefined') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: createMemoryStorage(),
    configurable: true,
  });
}

const mockUser: UserSerilizer = {
  id: 1,
  username: 'admin',
  first_name: 'Ali',
  last_name: 'Ahmad',
  is_staff: true,
  is_superuser: false,
  groups: [1, 2],
};

const mockSuperUser: UserSerilizer = {
  id: 2,
  username: 'super',
  first_name: 'Super',
  last_name: 'User',
  is_staff: false,
  is_superuser: true,
  groups: [],
};

const mockRegularUser: UserSerilizer = {
  id: 3,
  username: 'user',
  first_name: 'Regular',
  last_name: 'User',
  is_staff: false,
  is_superuser: false,
  groups: [3],
};

function createAccountsMock() {
  return {
    accountsDetailsRetrieve: vi.fn(),
    accountsTokenCreate: vi.fn(),
    accountsTokenRefreshCreate: vi.fn(),
  };
}

describe('AuthService', () => {
  let accountsMock: ReturnType<typeof createAccountsMock>;
  let snackbarMock: { error: ReturnType<typeof vi.fn>; success: ReturnType<typeof vi.fn>; open: ReturnType<typeof vi.fn> };
  let routerMock: { navigateByUrl: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    localStorage.clear();
    accountsMock = createAccountsMock();
    snackbarMock = { error: vi.fn(), success: vi.fn(), open: vi.fn() };
    routerMock = { navigateByUrl: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AccountsService, useValue: accountsMock },
        { provide: SnackbarService, useValue: snackbarMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    const auth = TestBed.inject(AuthService);
    expect(auth).toBeTruthy();
  });

  describe('token getter/setter', () => {
    it('should read null from localStorage when no token stored', () => {
      const auth = TestBed.inject(AuthService);
      expect(auth.token).toBeNull();
    });

    it('should read stored token from localStorage', () => {
      localStorage.setItem('zidnahum-token', 'stored-access');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);
      expect(auth.token).toBe('stored-access');
    });

    it('should persist token to localStorage when set', () => {
      const auth = TestBed.inject(AuthService);
      auth.token = 'new-token';
      expect(auth.token).toBe('new-token');
      expect(localStorage.getItem('zidnahum-token')).toBe('new-token');
    });

    it('should remove token from localStorage when set to null', () => {
      localStorage.setItem('zidnahum-token', 'old-token');
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);
      auth.token = null;
      expect(auth.token).toBeNull();
      expect(localStorage.getItem('zidnahum-token')).toBeNull();
    });
  });

  describe('refreshToken getter/setter', () => {
    it('should read null from localStorage when no refresh token stored', () => {
      const auth = TestBed.inject(AuthService);
      expect(auth.refreshToken).toBeNull();
    });

    it('should persist refresh token to localStorage when set', () => {
      const auth = TestBed.inject(AuthService);
      auth.refreshToken = 'new-refresh';
      expect(auth.refreshToken).toBe('new-refresh');
      expect(localStorage.getItem('zidnahum-refresh-token')).toBe('new-refresh');
    });

    it('should remove refresh token from localStorage when set to null', () => {
      const auth = TestBed.inject(AuthService);
      auth.refreshToken = 'old-refresh';
      auth.refreshToken = null;
      expect(auth.refreshToken).toBeNull();
      expect(localStorage.getItem('zidnahum-refresh-token')).toBeNull();
    });
  });

  describe('initialize', () => {
    it('should set currentUser to null when no token is stored', () => {
      accountsMock.accountsDetailsRetrieve.mockReturnValue(of(mockUser));
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      expect(auth.currentUser()).toBeNull();
      expect(accountsMock.accountsDetailsRetrieve).not.toHaveBeenCalled();
    });

    it('should fetch user details and set currentUser when token is valid', () => {
      localStorage.setItem('zidnahum-token', 'valid-token');
      accountsMock.accountsDetailsRetrieve.mockReturnValue(of(mockUser));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      const user = auth.currentUser();
      expect(user).toBeTruthy();
      expect(user!.id).toBe(1);
      expect(user!.username).toBe('admin');
      expect(user!.firstName).toBe('Ali');
      expect(user!.lastName).toBe('Ahmad');
      expect(user!.isAdmin).toBe(true); // is_staff=true
      expect(user!.isSuperUser).toBe(false);
      expect(user!.isStaff).toBe(true);
      expect(user!.groups).toEqual([1, 2]);
    });

    it('should set isAdmin true when is_superuser is true', () => {
      localStorage.setItem('zidnahum-token', 'valid-token');
      accountsMock.accountsDetailsRetrieve.mockReturnValue(of(mockSuperUser));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      const user = auth.currentUser();
      expect(user!.isAdmin).toBe(true);
      expect(user!.isSuperUser).toBe(true);
      expect(user!.isStaff).toBe(false);
    });

    it('should set isAdmin false for regular user', () => {
      localStorage.setItem('zidnahum-token', 'valid-token');
      accountsMock.accountsDetailsRetrieve.mockReturnValue(of(mockRegularUser));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      const user = auth.currentUser();
      expect(user!.isAdmin).toBe(false);
      expect(user!.isSuperUser).toBe(false);
      expect(user!.isStaff).toBe(false);
    });

    it('should default missing first_name/last_name to empty string', () => {
      localStorage.setItem('zidnahum-token', 'valid-token');
      accountsMock.accountsDetailsRetrieve.mockReturnValue(
        of({ ...mockUser, first_name: undefined, last_name: undefined }),
      );
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      expect(auth.currentUser()!.firstName).toBe('');
      expect(auth.currentUser()!.lastName).toBe('');
    });

    it('should default missing groups to empty array', () => {
      localStorage.setItem('zidnahum-token', 'valid-token');
      accountsMock.accountsDetailsRetrieve.mockReturnValue(
        of({ ...mockUser, groups: undefined }),
      );
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      expect(auth.currentUser()!.groups).toEqual([]);
    });

    it('should attempt token refresh on 401 and reinitialize on success', () => {
      localStorage.setItem('zidnahum-token', 'expired-token');
      localStorage.setItem('zidnahum-refresh-token', 'valid-refresh');

      accountsMock.accountsDetailsRetrieve
        .mockReturnValueOnce(throwError(() => new HttpErrorResponse({ status: 401 })))
        .mockReturnValueOnce(of(mockUser));
      accountsMock.accountsTokenRefreshCreate.mockReturnValue(
        of({ access: 'new-access', refresh: 'new-refresh', username: '', password: '' }),
      );
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      expect(accountsMock.accountsTokenRefreshCreate).toHaveBeenCalledWith({ refresh: 'valid-refresh' });
      expect(auth.token).toBe('new-access');
      expect(auth.refreshToken).toBe('new-refresh');
      expect(auth.currentUser()!.username).toBe('admin');
    });

    it('should clear tokens and currentUser when refresh fails', () => {
      localStorage.setItem('zidnahum-token', 'expired-token');
      localStorage.setItem('zidnahum-refresh-token', 'bad-refresh');

      accountsMock.accountsDetailsRetrieve.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 401 })),
      );
      accountsMock.accountsTokenRefreshCreate.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 401 })),
      );
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      expect(auth.token).toBeNull();
      expect(auth.refreshToken).toBeNull();
      expect(auth.currentUser()).toBeNull();
    });

    it('should not attempt refresh when afterRefresh is true', () => {
      localStorage.setItem('zidnahum-token', 'expired-token');
      localStorage.setItem('zidnahum-refresh-token', 'valid-refresh');

      accountsMock.accountsDetailsRetrieve.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 401 })),
      );
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);

      auth.initialize(true);

      expect(accountsMock.accountsTokenRefreshCreate).not.toHaveBeenCalled();
      expect(auth.currentUser()).toBeUndefined();
    });

    it('should silently handle non-401 errors', () => {
      localStorage.setItem('zidnahum-token', 'valid-token');

      accountsMock.accountsDetailsRetrieve.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 500 })),
      );
      const auth = TestBed.inject(AuthService);

      auth.initialize();

      expect(auth.currentUser()).toBeUndefined();
      expect(accountsMock.accountsTokenRefreshCreate).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should store tokens and set currentUser on successful login', () => {
      accountsMock.accountsTokenCreate.mockReturnValue(
        of({ access: 'login-access', refresh: 'login-refresh', username: 'u', password: 'p' }),
      );
      accountsMock.accountsDetailsRetrieve.mockReturnValue(of(mockRegularUser));
      const auth = TestBed.inject(AuthService);

      auth.login({ username: 'user', password: 'pass' }).subscribe();

      expect(auth.token).toBe('login-access');
      expect(auth.refreshToken).toBe('login-refresh');
      expect(auth.currentUser()!.username).toBe('user');
      expect(auth.currentUser()!.isAdmin).toBe(false);
    });

    it('should show snackbar error on 401 login failure', () => {
      accountsMock.accountsTokenCreate.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 401 })),
      );
      const auth = TestBed.inject(AuthService);

      auth.login({ username: 'bad', password: 'bad' }).subscribe();

      expect(snackbarMock.error).toHaveBeenCalledWith('لا يوجد حساب بهذه المعلومات');
      expect(auth.token).toBeNull();
      expect(auth.currentUser()).toBeUndefined();
    });

    it('should not show snackbar on non-401 errors', () => {
      accountsMock.accountsTokenCreate.mockReturnValue(
        throwError(() => new HttpErrorResponse({ status: 500 })),
      );
      const auth = TestBed.inject(AuthService);

      auth.login({ username: 'u', password: 'p' }).subscribe();

      expect(snackbarMock.error).not.toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('should clear tokens, currentUser, and navigate to home', () => {
      localStorage.setItem('zidnahum-token', 'some-token');
      localStorage.setItem('zidnahum-refresh-token', 'some-refresh');
      accountsMock.accountsDetailsRetrieve.mockReturnValue(of(mockUser));
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          AuthService,
          { provide: AccountsService, useValue: accountsMock },
          { provide: SnackbarService, useValue: snackbarMock },
          { provide: Router, useValue: routerMock },
        ],
      });
      const auth = TestBed.inject(AuthService);
      auth.initialize();

      auth.logout();

      expect(auth.token).toBeNull();
      expect(auth.refreshToken).toBeNull();
      expect(auth.currentUser()).toBeNull();
      expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
    });
  });
});
