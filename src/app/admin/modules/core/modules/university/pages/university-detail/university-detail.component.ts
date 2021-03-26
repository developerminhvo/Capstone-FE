import { Component, OnInit, DoCheck   } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UniversityService } from 'src/app/admin/services';
import { MajorRM, UniversityRM } from 'src/app/admin/view-models';
import Swal from 'sweetalert2';

import { CreateMajorModalComponent } from '../../components';

@Component({
  selector: 'app-university-detail',
  templateUrl: './university-detail.component.html',
  styleUrls: ['./university-detail.component.scss']
})
export class UniversityDetailComponent implements OnInit {
    

  total: number = 1;

  listOfMajor: (MajorRM & {stt?:number})[] = [];
  listOfDisplayMajor: (MajorRM & {stt?:number})[] = [];
  university: UniversityRM;

  pageSize: 10;
  pageIndex: 1;
  uniId: any;

  rowspan: number = 5;
  searchValueName = "";
  
  updateUniForm: FormGroup;
  eventValueChange: any = undefined;


  constructor(
    private _modalService: NzModalService,
    private _activatedRoute: ActivatedRoute,
    private _universityService: UniversityService,
    private _fb: FormBuilder
  ) { 
    this.initUpdateUniForm();    
  }

  ngOnInit() {    
    this.getUniversityById();      
  }
  ngDoCheck(){
        
  }

  getUniversityById(): void {
    this._activatedRoute.params.subscribe((param) => {      
      this._universityService.getUniversityById(param.id).pipe(
        tap((rs) => {  
          this.uniId = param.id;        
          this.university = rs;          
          this.listOfMajor = rs.majors.map((e, i) => ({
            ...e,
            stt: i + 1
          }));             
          this.listOfDisplayMajor = [...this.listOfMajor];   
          this.total = this.listOfDisplayMajor.length;                                                           
          this.setDataToForm(this.university);          
        }),
        catchError((err) => {
          console.log(err);
          return of(undefined);
        })
      ).subscribe();
    });
  }

  setDataToForm(university: UniversityRM): void {
    this._activatedRoute.params.subscribe((param) => {      
      this._universityService.getUniversityById(param.id).pipe(
        tap((rs) => {                    
          this.university = rs;
          this.updateUniForm.get('name').setValue(university.name);
          this.updateUniForm.get('code').setValue(university.code);
          this.updateUniForm.get('address').setValue(university.address);
          this.updateUniForm.get('description').setValue(university.description);
          this.updateUniForm.get('phone').setValue(university.phone);
          this.updateUniForm.get('webUrl').setValue(university.webUrl);
          this.updateUniForm.get('tuitionType').setValue(university.tuitionType);
          this.updateUniForm.get('tuitionFrom').setValue(university.tuitionFrom);
          this.updateUniForm.get('tuitionTo').setValue(university.tuitionTo);
          this.updateUniForm.get('status').setValue(university.status);          
        }),
        catchError((err) => {
          console.log(err);
          return of(undefined);
        })
      ).subscribe();
    });
  }

  initUpdateUniForm(): void {
    this.updateUniForm = this._fb.group({
      'name': ['', Validators.required],
      'code': ['', Validators.required],
      'address': ['', Validators.required],
      'phone': ['', Validators.required],
      'webUrl': ['', Validators.required],
      'tuitionType': [''],
      'tuitionFrom': [''],
      'tuitionTo': [''],
      'description': ['', Validators.required],  
      'rating': [1],
      'status': [0],    
    });
  }

  openCreateMajorModal(data: any | undefined): void {    
    this._modalService.create({
      nzContent: CreateMajorModalComponent,
      nzClosable: false,
      nzFooter: null,
      nzWidth: 700,   
      nzComponentParams: {data: data, majors: this.listOfMajor, universityId: this.uniId, universityName: this.university.name, callBack: (majors) => {
        this.listOfMajor = majors.map((e, i) => ({
          ...e,
          stt: i + 1
        }));  
        this.listOfDisplayMajor = majors.map((e, i) => ({
          ...e,
          stt: i + 1
        }));
        this.total = this.listOfDisplayMajor.length;              
      }},      
    })
  }

  updateUni(): void {
    const newValue = {
      "id": Number.parseInt(this.uniId),
      "code": this.updateUniForm.get('code').value,
      "name": this.updateUniForm.get('name').value,
      "address": this.updateUniForm.get('address').value,
      "logoUrl": "",
      "description": this.updateUniForm.get('description').value,
      "phone": this.updateUniForm.get('phone').value,
      "webUrl": this.updateUniForm.get('webUrl').value,
      "tuitionType": Number.parseInt(this.updateUniForm.get('tuitionType').value),
      "tuitionFrom": Number.parseInt(this.updateUniForm.get('tuitionFrom').value),
      "tuitionTo": Number.parseInt(this.updateUniForm.get('tuitionTo').value),
      "rating": this.updateUniForm.get('rating').value,
      "status": this.updateUniForm.get('status').value
    }   
    console.log(newValue);
    Swal.fire({
      title: 'Bạn có muốn lưu những thông tin đã thay đổi hay không?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Lưu`,
      denyButtonText: `Không lưu`,
      cancelButtonText: `Thoát`      
    }).then((result) => {
      if (result.isConfirmed) {
        this._universityService.updateUniversity(newValue).pipe(
          tap((rs) => {            
            let timerInterval;
            Swal.fire({
              title: 'Vui lòng chờ!',
              html: 'Đang xử lí...',
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {}, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {              
              if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire('Thành Công', 'Cập nhật thông tin trường thành công', 'success');
              }
            });
          }),
          catchError((err) => {
            let timerInterval;
            Swal.fire({
              title: 'Vui lòng chờ!',
              html: 'Đang xử lí...',
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading()
                timerInterval = setInterval(() => {}, 100)
              },
              willClose: () => {
                clearInterval(timerInterval)
              }
            }).then((result) => {              
              if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire('Lỗi', 'Cập nhật thông tin trường thất bại', 'error');
              }
            });            
            return of(undefined);
          })
        ).subscribe();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  searchByName(value: string): void {        
    this.listOfDisplayMajor = this.listOfMajor.filter((item: UniversityRM & {stt?:number}) => item.name.toLowerCase().indexOf(value.toLowerCase()) !== -1);
    console.log(this.listOfDisplayMajor);
  }


}
