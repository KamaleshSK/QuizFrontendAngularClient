import { Injectable } from '@angular/core';
import { Question } from './question/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { QuestionTopic } from './question/question_topic';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionsUrl = 'http://localhost:8080/questionnaire/all-active-questions/topic/eager';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  // temporary 
  questionTopic: QuestionTopic = {
    topic: `Competitive_Apps`
  }

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

  getQuestions(): Observable<Question[]> {
    return this.http.post<Question[]>(this.questionsUrl, this.questionTopic, this.httpOptions)
                .pipe(
                  tap(_ => console.log('fetched questions by topic')),
                  catchError(this.handleError<Question[]>('getQuestions', []))
                );
  }
}
