import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['THPT Bùi Thị Xuân',
                        'THPT Lương Thế Vinh',
                        'THPT Năng Khiếu TDTT',
                        'THPT Ten Lơ Man',
                        'THPT Trưng Vương',
                        'THPT Thủ Thiêm',
                        'THPT Giồng Ông Tố',
                        'THPT Lê Quí Đôn',
                        'THPT Lê Thị Hồng Gấm',
                        'THPT Marie Curie',
                        'THPT Nguyễn Thị Diệu',
                        'THPT Nguyễn Thị Minh Khai',
                        'THPT Nguyễn Trãi',
                        'THPT Nguyễn Hữu Thọ',
                        'THPT Hùng Vương',
                        'THPT Chuyên Lê Hồng Phong',
                        'PT Năng Khiếu Đại Học Quốc Gia',
                        'THPT Trần Hữu Trang'
                        ];
  filteredOptions: Observable<string[]>;
  formGr: FormGroup = null;
  constructor(private _formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
    this.formGr = this._formBuilder.group({
      name: [null, Validators.required],
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}
