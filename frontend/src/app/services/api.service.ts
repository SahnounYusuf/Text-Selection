import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SelectedLabels} from "../model/label_message";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = "http://localhost:8000"
  constructor(private http: HttpClient) { }

  exportData(data: SelectedLabels) {
    return this.http.post(`${this.url}/export`, data).subscribe(data => {
        console.log(data);
      },

      error => {
        console.log('Log the error here: ', error);
      });
  }
}
