import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Test } from 'src/app/_models/test';

@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.scss']
})
export class TestCardComponent implements OnInit {
  @Input() test: Test;
  @Output() testSelected = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  loadTest(id: number) {
    this.testSelected.emit(id);
  }

}
