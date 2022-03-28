import { Component, OnInit } from '@angular/core';
import { Question } from './question';
import { QuestionService } from '../question.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  questions: Question[] = [];

  currentQuestion?: Question;

  currentQuestionIndex: number = 0;

  selectedOptions: number[] = [];

  scoreOnSubmit?: number;

  scoreModalOpen?: boolean;

  constructor(private questionService: QuestionService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getQuestions();
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

  submitQuiz(): void {
    let score = 0;
    for (let i=0; i<this.selectedOptions.length; i++) {
      if (this.selectedOptions[i]+1 === this.questions[i].correct_option) {
        score++;
      }
    }
    this.scoreOnSubmit = score;
    this.scoreModalOpen = true;
  }

  getQuestions(): void {
    this.questionService.getQuestions()
        .subscribe(questions => {
          this.questions = questions;
          this.currentQuestion = questions[0];

          for (let _ of questions) {
            this.selectedOptions.push(-1);
          }
        });
  }

}
