import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

const API = 'https://st-sti.escort-advisor.com/api/v1/'

/* apiUrl_local: 'http://localhost:8080',
apiUrl: 'https://st-sti.escort-advisor.com/api/v1/' */

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: false
};

@Injectable({
  providedIn: 'root'
})
export class AcheronService {

  constructor(private http: HttpClient) { }

  getForms() {
    return this.http.get(`${API}form`, httpOptions);
  }

  getForm(id: string | number = 27) {
    return this.http.get(`${API}form/${id}`, httpOptions);
  }
}
