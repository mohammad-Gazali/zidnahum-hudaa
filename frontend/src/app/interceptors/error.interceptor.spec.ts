import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { signal } from '@angular/core';
import { SnackbarService } from '@shared';
import { LOADING } from '@shared';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  let httpMock: HttpTestingController;
  let snackbarMock: { error: ReturnType<typeof vi.fn>; success: ReturnType<typeof vi.fn>; open: ReturnType<typeof vi.fn> };
  let loadingSignal: ReturnType<typeof signal<boolean>>;

  function setup() {
    snackbarMock = { error: vi.fn(), success: vi.fn(), open: vi.fn() };
    loadingSignal = signal(false);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
        { provide: SnackbarService, useValue: snackbarMock },
        { provide: LOADING, useValue: loadingSignal },
      ],
    });
    httpMock = TestBed.inject(HttpTestingController);
  }

  afterEach(() => httpMock.verify());

  it('should show snackbar error and set loading false when response has detail', () => {
    setup();
    const http = TestBed.inject(HttpClient);

    let error: HttpErrorResponse | undefined;
    http.get('/api/test').subscribe({ error: (e: HttpErrorResponse) => (error = e) });

    const req = httpMock.expectOne('/api/test');
    req.flush({ detail: 'Something went wrong' }, { status: 400, statusText: 'Bad Request' });

    expect(snackbarMock.error).toHaveBeenCalledWith('Something went wrong');
    expect(loadingSignal()).toBe(false);
    expect(error).toBeTruthy();
    expect(error!.status).toBe(400);
  });

  it('should not show snackbar when response has no detail field', () => {
    setup();
    const http = TestBed.inject(HttpClient);

    http.get('/api/test').subscribe({ error: (err) => void err });

    const req = httpMock.expectOne('/api/test');
    req.flush({ message: 'err' }, { status: 500, statusText: 'Server Error' });

    expect(snackbarMock.error).not.toHaveBeenCalled();
  });

  it('should skip accounts/details URLs entirely', () => {
    setup();
    const http = TestBed.inject(HttpClient);

    http.get('/api/v1/accounts/details').subscribe({ error: (err) => void err });

    const req = httpMock.expectOne('/api/v1/accounts/details');
    req.flush({ detail: 'Unauthorized' }, { status: 401, statusText: 'Unauthorized' });

    expect(snackbarMock.error).not.toHaveBeenCalled();
  });

  it('should pass through successful responses without modification', () => {
    setup();
    const http = TestBed.inject(HttpClient);

    let result: unknown;
    http.get('/api/test').subscribe((r) => (result = r));

    const req = httpMock.expectOne('/api/test');
    req.flush({ ok: true });

    expect(result).toEqual({ ok: true });
    expect(snackbarMock.error).not.toHaveBeenCalled();
  });
});
