import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @Input() scoreOnSubmit?: number;

  @Input() scoreModalOpen?: number;

  @Output() modalCloseEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  closeScoreModal(): void {
    this.scoreModalOpen = 0;
    this.modalCloseEvent.emit(`closed`);
  }

}
