import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
private url='https://opentdb.com/api.php?amount=10&type=multiple'

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any> {
    return this.http.get(this.url)
  }

}
