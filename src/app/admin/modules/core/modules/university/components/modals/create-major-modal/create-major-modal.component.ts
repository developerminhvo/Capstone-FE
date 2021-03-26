import { Component, Input, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MajorService, SubjectGroupService } from 'src/app/admin/services';
import { CustomSelectComponent } from 'src/app/admin/shared/components';
import { MajorRM, SubjectGroupRM } from 'src/app/admin/view-models';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-major-modal',
  templateUrl: './create-major-modal.component.html',
  styleUrls: ['./create-major-modal.component.scss']
})
export class CreateMajorModalComponent implements OnInit {

  //Decorator
  @Input() data: MajorRM | undefined;
  @Input() majors: (MajorRM & { stt?: number })[];
  @Input() universityId: any;
  @Input() universityName: string;
  @Input() callBack: (majors: MajorRM[]) => void;
  @ViewChild(CustomSelectComponent) customSelectComponent: CustomSelectComponent

  //Title
  modalTitle: string = "Thêm Ngành của";

  //FormGroup
  majorForm: FormGroup;
  majorSystemForm: FormGroup;
  listField: FormGroup[] = [];
  listFieldTmp: FormGroup[] = [];

  //Behavior
  majorResult: Observable<any[]> = new BehaviorSubject([]);
  listOfDisplayMajorResult: any[] = [];
  subjectGroupResult: Observable<any[]> = new BehaviorSubject([]);
  listOfDisplaySubjectGroup: Observable<any[]> = new BehaviorSubject([]);
  listExistSubjectGroup: any[] = [];


  constructor(
    private _fb: FormBuilder,
    private _modalRef: NzModalRef,
    private _majorService: MajorService,
    private _subjectGroupService: SubjectGroupService,
    private _notification: NzNotificationService
  ) {
    this.initMajorForm();
    this.initMajorSystemForm();
  }
  ngOnInit() {
    this.getAllMajor();
    this.getAllSubjectGroup();
    this.setData();
  }

  initMajorForm(): void {
    this.majorForm = this._fb.group({
      'name': [undefined, Validators.required],
      'code': [''],
      'numberOfStudent': ['', Validators.required]
    })
  }

  getAllMajor(): void {
    this.majorResult = this._majorService.getAllMajor().pipe(      
      map((rs) => rs.filter((mj) => (mj.id !== this.majors.find((e) => e.id === mj.id)?.id))) // chuyen gia tri rs thanh 1 gia tri khac dang. Observeble. đúng chưa?
    );        
  }

  getAllSubjectGroup(): void {
    this.subjectGroupResult = this._subjectGroupService.getAllSubjectGroup().pipe();
    this.listOfDisplaySubjectGroup = this.subjectGroupResult.pipe(
      map((rs) => this.data ? rs.filter((sb) => (sb.id !== this.data.subjectGroups.find((e) => e.id === sb.id)?.id)) : rs),
    )    
  }  

  setData(): void {
    this.subjectGroupResult.subscribe((data) => {      
      if (this.data != undefined) {
        this.modalTitle = "Sửa Thông Tin Ngành của " + `${this.universityName}`;
        const tmp = {
          id: this.data.id,
          name: this.data.name,
          code: this.data.code
        };
        this.majorForm.get('name').setValue(tmp);
        this.majorForm.get('numberOfStudent').setValue(this.data.numberOfStudents);
        if (this.data.subjectGroups.length > 0) {
          for (let i = 0; i < this.data.subjectGroups.length; i++) {
            const subJectGroup = this.data.subjectGroups[i];            
            const field = this._fb.group({
              'subjectGroup': [data.find((e) => e.id === subJectGroup.id)],
              'entryMarkId1': [`${subJectGroup.entryMarks[0]?.id}`],
              'entryMark1': [`${subJectGroup.entryMarks[0].mark}`,],
              'entryMarkId2': [`${subJectGroup.entryMarks[1]?.id}`],
              'entryMark2': [`${subJectGroup.entryMarks[1].mark}`,],
            });
            field['isUpdate'] = true;
            this.listField.push(field);
          }
          this.listFieldTmp = this.listField.slice();
        }
      } else {
        this.modalTitle = "Thêm Ngành của " + `${this.universityName}`;
        this.addField();
      }
    })
  }



  submitForm(): void {
    const subjectGroups: SubjectGroupRM[] = [];
    const tmpUI = this.listField.map(e => e.value);
    for (let i = 0; i < tmpUI.length; i++) {
      subjectGroups.push({
        id: Number.parseInt(tmpUI[i].subjectGroup?.id),
        entryMarks: [
          {
            mark: Number.parseInt(tmpUI[i]?.entryMark1),
            year: 2019
          },
          {
            mark: Number.parseInt(tmpUI[i]?.entryMark2),
            year: 2020
          }
        ]
      });
    }
    const newValue = {
      'universityId': Number.parseInt(this.universityId),
      'majorId': this.majorForm.get('name').value.id,
      "majorName": '',
      "numberOfStudents": Number.parseInt(this.majorForm.get('numberOfStudent').value),
      "code": this.majorForm.get('name').value.code,
      "subjectGroups": subjectGroups
    };
    this._majorService.createMajor(newValue).pipe(
      tap((rs) => {
        this.callBack(rs.majors);
        this._modalRef.close();
        Swal.fire('Thành công', 'Thêm ngành mới thành công', 'success');
      }),
      catchError((err) => {
        Swal.fire('Lỗi', 'Thêm ngành mới thất bại', 'error');
        return of(undefined);
      })
    ).subscribe();
  }

  updateForm(): void {
    const subjectGroups: SubjectGroupRM[] = [];
    const tmp = this.listField.map(e => e.value);
    const tmpSubmit = this.listFieldTmp.map(e => e.value);
    for (let i = 0; i < tmpSubmit.length; i++) {
      if (tmp.find((e) => e.subjectGroup?.id === tmpSubmit[i].subjectGroup?.id)) {
        tmpSubmit[i] = tmp.find((e) => e.subjectGroup?.id === tmpSubmit[i].subjectGroup?.id)
      } else {
        tmpSubmit[i].subjectGroup.isDeleted = true;
      }
    }
    for (let i = 0; i < tmp.length; i++) {
      if (!tmpSubmit.find((e) => e.subjectGroup?.id === tmp[i].subjectGroup?.id)) {
        tmpSubmit.push(tmp[i]);
      }
    }
    for (let i = 0; i < tmpSubmit.length; i++) {
      subjectGroups.push({
        id: Number.parseInt(tmpSubmit[i].subjectGroup?.id),
        isDeleted: tmpSubmit[i].subjectGroup?.isDeleted,
        entryMarks: [
          {
            id: tmpSubmit[i].entryMarkId1 ? Number.parseInt(tmpSubmit[i].entryMarkId1) : -1,
            mark: Number.parseInt(tmpSubmit[i].entryMark1),
            year: 2019
          },
          {
            id: tmpSubmit[i].entryMarkId2 ? Number.parseInt(tmpSubmit[i].entryMarkId2) : -1,
            mark: Number.parseInt(tmpSubmit[i].entryMark2),
            year: 2020
          }
        ]
      });
    }
    const newValue = {
      'universityId': Number.parseInt(this.universityId),
      'majorId': this.majorForm.get('name').value.id,
      "numberOfStudents": Number.parseInt(this.majorForm.get('numberOfStudent').value),
      "subjectGroups": subjectGroups
    }
    this._majorService.updateMajor(newValue).pipe(
      tap((rs) => {        
        this.callBack(rs.majors);
        Swal.fire('Thành công', 'Thay đổi thông tin thành công', 'success');
        this._modalRef.close();
      }),
      catchError((err) => {
        Swal.fire('Lỗi', 'Thay đổi thông tin thất bại', 'error');
        return of(undefined);
      })
    ).subscribe();
  }

  addField(): void {
    const group = this._fb.group({
      'subjectGroup': [undefined, Validators.required],
      'entryMark1': ['', Validators.required],
      'entryMark2': ['', Validators.required],
    });
    this.listField.push(group);
    this.checkValidateListField();
    console.log(this.checkValidateListField());
  }

  checkValidateListField(): boolean {
    const list = this.listField.map((e) => e.invalid);
    if (list.includes(true)) {
      return true;
    } 
    return false;
  }
  useSelect(item) {    
    const list = this.listField.filter((e) => !e['isUpdate']).map((e) => e.value);    
    this.listOfDisplaySubjectGroup = this.subjectGroupResult.pipe(
      map((rs) => this.data ? rs.filter((sb) => (sb.id !== this.data.subjectGroups.find((e) => e.id === sb.id)?.id)) : rs),
      // tap(rs => console.log('before', rs)),
      map((rs) => rs.filter((e) => !list.some((_) => _.subjectGroup.id === e.id)) ),
      // tap(rs => console.log('after', rs)),
    )
  }

  
  removeField(index: number, field?: any | undefined): void {
    Swal.fire({
      title: 'Bạn có chắc không?',
      text: "Dữ liệu sẽ không trở lại trạng thái ban đầu!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Vâng, tôi đồng ý!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.listField.splice(index, 1);
      }
    })
  }

  //--- UI ---
  cancle(): void {
    this.closeModal();
  }

  closeModal(): void {
    this._modalRef.close();
  }

  //--------------- MAJOR TO SYSTEM -----------
  hidePopover(): void {
    this.customSelectComponent.popover.hide();
  }

  initMajorSystemForm(): void {
    this.majorSystemForm = this._fb.group({
      'majorSystemName': ['', Validators.required],
      'majorSystemCode': ['', Validators.required]  
    })
  }

  addNewMajorSystem(): void {    
    const newValue = {
      'name': this.majorSystemForm.get('majorSystemName').value,
      'code': this.majorSystemForm.get('majorSystemCode').value
    }
    console.log(newValue);
    this._majorService.addNewMajorSystem(newValue).pipe(
      tap((res) => {                 
        this.hidePopover();
        this.getAllMajor();
        this.createNotification('success', 'Thành công', 'Thêm mới ngành vào hệ thống thành công');         
      }),
      catchError((err) => {
        this.createNotification('error', 'Thất bại', 'Thêm mới ngành vào hệ thống thất bại');
        return of(undefined);
      })
    ).subscribe();
  }
  
  createNotification(type: string, title: string, description: string): void {
    this._notification.create(
      type,
      title,
      description
    );
  }
}
