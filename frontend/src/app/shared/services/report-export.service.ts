/**
 * Hand-written service for report Excel exports.
 *
 * WHY this file exists alongside the generated ReportsService:
 * The backend's reports views return either JSON (default) or raw .xlsx bytes
 * when `?excel=true`. Orval cannot represent this conditional response type —
 * it always generates `responseType: 'body'` (JSON), never `'blob'`. As a
 * result, calling the generated ReportsService with `?excel=true` silently
 * parses the binary payload as JSON, producing a corrupt download.
 *
 * This service makes the same HTTP calls but explicitly sets
 * `responseType: 'blob'` and always appends `?excel=true`.
 *
 * DO NOT regenerate this file — it is intentionally hand-written.
 * If you add a new report-export endpoint, add a method here AND
 * in the backend's schema so the non-excel path is still generated.
 */

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from './api/api.base-url';
import type { ReportsRequest, ReportsRequestWithMasjed } from './api/models';

@Injectable({ providedIn: 'root' })
export class ReportExportService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  studentReportExcel(
    id: number,
    data: ReportsRequest,
  ): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/api/v1/reports/student/${id}`,
      data,
      { params: { excel: true }, responseType: 'blob' },
    );
  }

  allStudentsReportExcel(
    data: ReportsRequestWithMasjed,
  ): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/api/v1/reports/student/all`,
      data,
      { params: { excel: true }, responseType: 'blob' },
    );
  }

  categoryReportExcel(
    id: number,
    data: ReportsRequestWithMasjed,
  ): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/api/v1/reports/category/${id}`,
      data,
      { params: { excel: true }, responseType: 'blob' },
    );
  }

  allCategoriesReportExcel(
    data: ReportsRequestWithMasjed,
  ): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/api/v1/reports/category/all`,
      data,
      { params: { excel: true }, responseType: 'blob' },
    );
  }

  groupReportExcel(
    id: number,
    data: ReportsRequestWithMasjed,
  ): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/api/v1/reports/group/${id}`,
      data,
      { params: { excel: true }, responseType: 'blob' },
    );
  }

  allGroupsReportExcel(
    data: ReportsRequestWithMasjed,
  ): Observable<Blob> {
    return this.http.post(
      `${this.baseUrl}/api/v1/reports/group/all`,
      data,
      { params: { excel: true }, responseType: 'blob' },
    );
  }
}
