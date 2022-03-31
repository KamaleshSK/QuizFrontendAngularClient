import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { QuestionService } from '../question.service';
import { Topic } from './topic';
import { Question } from '../question/question';

@Component({
  selector: 'app-topics-accordion',
  templateUrl: './topics-accordion.component.html',
  styleUrls: ['./topics-accordion.component.css']
})
export class TopicsAccordionComponent implements OnInit {

  @Input() questions?: Question[];

  @Input() selectedOptions?: number[];

  @Input() readyToStart: boolean = false;

  topics: Topic[] = [];

  selectedTopic?: Topic;

  @Output() selectTopicEvent = new EventEmitter<string>();

  @Output() selectQuestionNavEvent = new EventEmitter<Question>();

  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.getTopics();
  }

  selectTopic(topic: Topic): void {
    if (topic !== this.selectedTopic) {
      this.selectedTopic = topic;
      this.selectTopicEvent.emit(topic.topic);
    }
  }

  selectQuestionNav(question: Question): void {
    this.selectQuestionNavEvent.emit(question);
  }

  getTopics(): void {
    this.questionService.getTopics()
        .subscribe(topics => {
          this.topics = topics;
        });
  }

}
