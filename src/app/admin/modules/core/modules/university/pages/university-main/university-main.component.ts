import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UniversityService } from 'src/app/admin/services';
import { UniversityRM } from 'src/app/admin/view-models';
import Swal from 'sweetalert2';



import { CreateUniversityModalComponent } from '../../components';


@Component({
  selector: 'app-university-main',
  templateUrl: './university-main.component.html',
  styleUrls: ['./university-main.component.scss']
})
export class UniversityMainComponent implements OnInit {
    
  loading: true;

  total = 1;
  pageSize = 10;
  pageIndex = 1;
  listOfUniversity: (UniversityRM & {stt?:number})[] = [];
  listOfDisplayUniversity:  (UniversityRM & {stt?:number})[] = [];
  //------------------SEARCH SORT FILTER------------------------
  searchValueName: string = '';

  listOfStatusFilter: any[] = [
    {text: 'Hoạt Động', value: 1},
    {text: 'Không Hoạt Động', value: 0},
  ]
  
  listOfTuitionType: any[] = [
    {text: 'Theo Năm', value: 0},
    {text: 'Theo Kì', value: 1},
  ]
  //-----------------------------------------------------
  constructor(
    private _modalService: NzModalService,
    protected _universityService: UniversityService
  ) { }

  ngOnInit() {    
    this.getAllUniversity();    
  }

  getAllUniversity(): void {
    this._universityService.getAllUniversity().pipe(
      tap((rs) => {                                   
        this.listOfUniversity = rs.map((e, i) => ({
          ...e,
          phones: e.phone.split('-'),
          stt: i + 1
        }));              
        this.listOfDisplayUniversity = [...this.listOfUniversity];        
        this.total = this.listOfUniversity.length;             
      }),
      catchError((err) => {
        console.log(err);
        return of(undefined);
      })
    ).subscribe();
  }

  openCreateUniversityModal(): void {
    this._modalService.create({
      nzContent: CreateUniversityModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,  
      nzComponentParams: {callBack: (item) => {   
        console.log(this.listOfUniversity)          
        this.listOfUniversity.push(item);        
        this.listOfUniversity.splice(0, 0, item);
        // this.listOfDisplayUniversity = [...this.listOfUniversity];
        this.listOfDisplayUniversity = this.listOfUniversity.map((e) => ({
          ...e,
          stt: e.stt + 1                   
        }));
      }, index: this.listOfUniversity.length}    
    });
  }  

  
  
  searchByName(searchValue: string): void {         
    this.listOfDisplayUniversity = this.listOfUniversity.filter((item: UniversityRM & {stt?:number, phones?:string[]}) => item?.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1);
  }
  filterStatusFn = (status: number, item: UniversityRM) => item.status === status;
  filterTuitionTypeFn = (tuitionType: number, item: UniversityRM) => item.tuitionType === tuitionType;
}
