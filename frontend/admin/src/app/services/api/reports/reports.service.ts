import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ApiConfiguration } from '../admin/api-configuration';
import {
  ReportsRequest,
  ReportsStudentCategoryOrGroupResponse,
  ReportsStudentResponse,
  ReportsRequestWithMasjed,  
  ReportsAllGroupsResponseItem,
  ReportsAllCategoriesResponseItem,
} from './reports.type';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private http = inject(HttpClient);
  private rootUrl = inject(ApiConfiguration).rootUrl.slice(0, -5) + 'reports';

  public createStudentReport(id: number, data: ReportsRequest) {
    return this.http.post<ReportsStudentResponse>(
      `${this.rootUrl}/student/${id}`,
      data
    );
  }

  public createStudentReportExcel(id: number, data: ReportsRequest) {
    return this.http.post(`${this.rootUrl}/student/${id}?excel=True`, data, {
        responseType: 'blob'
    });
  }

  public createCategoryReport(id: number, data: ReportsRequestWithMasjed) {
    return this.http.post<ReportsStudentCategoryOrGroupResponse>(
      `${this.rootUrl}/category/${id}`,
      data
    );
  }

  public createCategoryReportExcel(id: number, data: ReportsRequestWithMasjed) {
    return this.http.post(`${this.rootUrl}/category/${id}?excel=True`, data, {
      responseType: 'blob',
    });
  }

  public createGroupReport(id: number, data: ReportsRequestWithMasjed) {
    return this.http.post<ReportsStudentCategoryOrGroupResponse>(
      `${this.rootUrl}/group/${id}`,
      data
    );
  }

  public createGroupReportExcel(id: number, data: ReportsRequestWithMasjed) {
    return this.http.post(`${this.rootUrl}/group/${id}?excel=True`, data, {
      responseType: 'blob',
    });
  }

  public createAllCategoriesReport(data: ReportsRequestWithMasjed) {
    return this.http.post<ReportsAllCategoriesResponseItem[]>(`${this.rootUrl}/category/all`, data)
  }

  public createAllCategoriesReportExcel(data: ReportsRequestWithMasjed) {
    return this.http.post(`${this.rootUrl}/category/all?excel=True`, data, {
      responseType: 'blob'
    })
  }

  public createAllGroupsReport(data: ReportsRequestWithMasjed) {
    return this.http.post<ReportsAllGroupsResponseItem[]>(`${this.rootUrl}/group/all`, data)
  }

  public createAllGroupsReportExcel(data: ReportsRequestWithMasjed) {
    return this.http.post(`${this.rootUrl}/group/all?excel=True`, data, {
      responseType: 'blob'
    })
  }
}
