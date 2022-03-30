import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { HttpClientModule } from '@angular/common/http';
import { ScoreCardComponent } from './score-card/score-card.component';
import { TopicsAccordionComponent } from './topics-accordion/topics-accordion.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    ScoreCardComponent,
    TopicsAccordionComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
