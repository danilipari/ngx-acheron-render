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

  getAcheron(w_id: string | number, f_id?: string | number) {
    const data = f_id !== null || f_id !== undefined ? {
      "workflow_id": w_id,
      "form_id": f_id
    } : {
      "workflow_id": w_id,
    };

    return this.http.post(`${API}acheron`, { ...data }, httpOptions);
  }
}
