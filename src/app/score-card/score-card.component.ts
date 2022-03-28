import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-score-card',
  templateUrl: './score-card.component.html',
  styleUrls: ['./score-card.component.css']
})
export class ScoreCardComponent implements OnInit {

  @Input() scoreOnSubmit?: number;

  @Input() scoreModalOpen?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  closeScoreModal(): void {
    this.scoreModalOpen = false;
  }

}
