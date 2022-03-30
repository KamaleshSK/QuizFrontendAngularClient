import { Injectable } from '@angular/core';
import { Question } from './question/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Topic } from './topics-accordion/topic';
import { QuestionTopic } from './question/question-topic';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUrl = 'http://localhost:8080/questionnaire/all-active-questions/topic/eager';
  private topicsUrl = 'http://localhost:8080/questionnaire/all-questionnaires/lazy'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getQuestions(topic: QuestionTopic): Observable<Question[]> {
    return this.http.post<Question[]>(this.questionsUrl, topic, this.httpOptions)
                .pipe(
                  tap(_ => console.log('fetched questions by topic')),
                  catchError(this.handleError<Question[]>('getQuestions', []))
                );
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(this.topicsUrl)
                .pipe(
                  tap(_ => console.log('fetched Topics')),
                  catchError(this.handleError<Topic[]>('getTopics', []))
                );
  }
}
