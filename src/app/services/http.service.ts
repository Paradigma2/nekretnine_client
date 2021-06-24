import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  get(req, body): Observable<object> {
    return this.http.get(`${this.uri}/${req}`, body);
  }

  post(req, body, httpHeaders = null): Observable<object> {
    if (httpHeaders) {
      return this.http.post(`${this.uri}/${req}`, body, { headers: httpHeaders });
    } else {
      return this.http.post(`${this.uri}/${req}`, body);
    }
  }

  put(req, body, httpHeaders = null): Observable<object> {
    if (httpHeaders) {
      return this.http.put(`${this.uri}/${req}`, body, { headers: httpHeaders });
    } else {
      return this.http.put(`${this.uri}/${req}`, body);
    }
  }
}
