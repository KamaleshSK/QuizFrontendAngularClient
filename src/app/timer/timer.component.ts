import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  timeLeft: number = 900;

  interval: any;

  @Input() readyToStart: boolean = true;

  @Output() countDownEndEmitter = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
      
  }

  ngOnChanges(changes: SimpleChanges): void {
    const readyToStartChange = changes["readyToStart"];
    console.log("change")
    if (readyToStartChange !== null && readyToStartChange.currentValue === false) {
      this.startTimer();
    } else if (readyToStartChange !== null && readyToStartChange.currentValue === true) {
      this.resetTimer();
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startTimer(): void {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft);
      } else {
        this.timeLeft = 900;
        this.countDownEndEmitter.emit(`timer-end`);
      }
    }, 1000)
  }

  resetTimer(): void {
    clearInterval(this.interval);
    this.timeLeft = 900;
  }

}
