import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { SearchResponse } from '../../youtube/models/search-response';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<SearchResponse>, next: HttpHandler): Observable<HttpEvent<SearchResponse>> {
    const apiRequest = req.clone({
      url: `${environment.YOUTUBE_BASE_URL}/${req.url}`,
      setParams: {
        key: environment.YOUTUBE_API_KEY,
      },
    });
    return next.handle(apiRequest);
  }
}
