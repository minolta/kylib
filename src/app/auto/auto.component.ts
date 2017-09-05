import { FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';
/**
 * สำหรับทำ Autocomplete ใช้ method 
 * s() 
 * sn()
 * p  สำหรับใส่ Placeholrder
 * bag ใช้สำหรับ ส่งค่าออกมา
 * service ใช้สำหรับ list และค้นหา ที่เราจะทำ auto
 * select สำหรับเมื่อมีการเลือกจะส่งที่เลือกออกไป
 */
@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.css']
})
export class AutoComponent implements OnInit, OnChanges {
  constructor() { }
  @Input()
  bag = { obj: { name: '', id: 0 } };

  @Input()
  placeholder: string;

  @Input()
  p = 'autocomplete';
  @Input()
  service: any;
  c = new FormControl();
  datas: Observable<any>;
  @Output()
  select = new EventEmitter();
  trytosearch = true; //ใช้สำหรับบอกว่าถ้า เลือกจาก list แล้วไม่ต้อง search อีกรอบ
  ngOnInit() {

    this.datas = this.c.valueChanges.debounceTime(300).distinctUntilChanged().switchMap(term => term   // switch to new observable each time
      ? this.find(term, this.service, this.bag) : this.notfound(this.bag))
      .catch(error => {
        console.log(`Error in component ... ${error}`);
        return Observable.of<any[]>([]);
      });

  }

  /**
   * เมื่อกดเลือกแล้ว ก็ไม่ต้องค้นหาอะไรอีก
   * findobj ก็จะไม่ทำงาน
   */
  selectvalue(e: any) {
    console.log('select value ' + JSON.stringify(e));
    this.select.emit(e);
    this.bag.obj = e;
    this.trytosearch = false;
  }

  ngOnChanges(changes: SimpleChanges) {

  }

  notfound(object) {
    console.log('Not found ');
    // object.obj.name = '';
    return Observable.of<any[]>([]);
  }



  /**
   * ใช้ค้นหาว่า คำที่ให้ค้นมีอะไรบ้าง
   */
  find(term: string, service, target: any) {
    console.log('find ' + JSON.stringify(term) + ' ' + this.trytosearch);
    let o: Observable<any> = service.sn(term);
    console.log(o);
    this.findobj(service, term, target);
    return o;
  }


  /**
   * ใช้สำหรับค้นหาว่าที่ผิดไว้แต่ไม่เลือก ให้ระบบค้นหาให้เจอถ้าเจอแล้วก็เลือกมาใส่เอง
   * โดยไม่ต้องกดเลือก
   */
  findobj(service, term, target) {


    console.log('find one  ' + term)
    let one: Observable<any> = service.sm(term);
    one.subscribe(data => {
      console.log('Found object :' + JSON.stringify(data));
      if (data instanceof Array) //ถาเป็น array
      {
        console.log('IS Array');
        if (data.length === 1) {//ถ้าเท่ากับ 1 เท่ากับตรงทุกตัวถึงจะเพิ่มแบบ auto ให้แต่ถ้าไม่ก็ข้ามไปเลยเป็น 
          target.obj = data[0];
        }
        else {//ถ้าไม่เจอเลย
          console.log('Object not found ' + term);
          this.objnotfound(target, term);
        }
      }
      else { //ถ้าคืนค่าเป็น object เดียวๆ 
        console.log('Fond obj ' + JSON.stringify(data));
        target.obj = data;
        this.select.emit(data);
      }


    }, error => {
      console.log('ERROR : Object not found ' + term+' ERROR:'+error);
      this.objnotfound(target, term);
    });






  }


  objnotfound(target, term) {
    target.obj = { name: term, id: 0 };
  }

}
