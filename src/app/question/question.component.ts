import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Question } from './question';
import { QuestionService } from '../question.service';
import { MessageService } from '../message.service';
import { QuestionTopic } from './question-topic';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions: Question[] = [];

  currentQuestion?: Question;

  currentQuestionIndex: number = -1;

  selectedOptions: number[] = [];

  scoreOnSubmit?: number;

  scoreModalOpen?: number;

  readyToStart: boolean = false;

  currentTopic: string = ""; 

  constructor(private questionService: QuestionService,
              private messageService: MessageService) { }

  ngOnInit(): void {
  }

  selectOption(option: string): void {
    this.selectedOptions[this.currentQuestionIndex] = this.questions[this.currentQuestionIndex].option_list.indexOf(option);
  }

  nextQuestion(): void {
    this.currentQuestion = this.questions[this.currentQuestionIndex+1];
    this.currentQuestionIndex++;
  }

  prevQuestion(): void {
    this.currentQuestion = this.questions[this.currentQuestionIndex-1];
    this.currentQuestionIndex--;
  }

  startQuiz(): void {
    this.readyToStart = false;
    this.currentQuestion = this.questions[0];
    this.currentQuestionIndex = 0;
  }

  submitQuiz(): void {
    let score = 0;
    for (let i=0; i<this.selectedOptions.length; i++) {
      if (this.selectedOptions[i]+1 === this.questions[i].correct_option) {
        score++;
      }
    }
    this.scoreOnSubmit = score;
    this.scoreModalOpen = 1;
    this.readyToStart = true;
  }

  countDownEndEmitter(event: string) {
    if (event === `timer-end`) {
      this.submitQuiz();
    }
  }

  modalCloseEvent(event: string) {
    if (event === `closed`) {
      this.scoreModalOpen = 0;
      this.resetQuiz(this.currentTopic);
    }
  } 

  selectQuestionNavEvent(event: Question) {
    this.currentQuestion = event;
    this.currentQuestionIndex = this.questions.indexOf(this.currentQuestion);
  }

  selectTopicEvent(topic: string) {
    this.resetQuiz(topic);
    this.readyToStart = true;
  }

  resetQuiz(topic: string): void {
    if (this.currentTopic === topic) {
      for (let i=0; i<this.selectedOptions.length; i++) {
        this.selectedOptions[i] = -1;
      }
    } else {
      this.getQuestions(topic);
    }
    this.currentQuestionIndex = -1;
    this.scoreOnSubmit = 0;
  }

  getQuestions(topicString: string): void {
    let topicBody: QuestionTopic = {
      topic: topicString
    }
    this.questionService.getQuestions(topicBody)
        .subscribe(questions => {
          this.questions = questions;
          this.selectedOptions = [];

          for (let _ of questions) {
            this.selectedOptions.push(-1);
          }
        });
  }

}
