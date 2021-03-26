import { Component, Input, OnInit, OnChanges, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, OnChanges {

  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

  @Input()
  public control: FormControl;

  @Input()
  public data: unknown[] = [];

  @Input()
  public name: string;

  @Input()
  public label: string;

  @Input()
  public placeholder: string;

  @Input()
  public titleNewItem: string = '';

  @Input()
  public exitedData: unknown[] | undefined = [];

  @Input()
  public templateRef: string;

  @Output()
  public useSelect: EventEmitter<unknown> = new EventEmitter<unknown>();
  

  public dataFilters: unknown[] = [];

  public searchControl: FormControl;
  constructor() {
    this.searchControl = new FormControl('');
  }

  ngOnInit() {
    this.filter('');
    this.searchControl.valueChanges.subscribe((value) => this.filter(value));
  }
  ngOnChanges() {    
    this.filter(this.searchControl.value);    
  }
  filter(value: string) {
    this.dataFilters = this.data ? this.data.filter((item) => (item[this.label] as string).includes(value)) : [];    
  }
  selecteItem(item: unknown) {
    if (this.control) {
      this.control.setValue(item);
    }
    this.useSelect.emit(item);
  }  

  open() {
    this.popover.show();
  }
}
