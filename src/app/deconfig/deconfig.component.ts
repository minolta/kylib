import { EditdbconfigComponent } from './../editdbconfig/editdbconfig.component';
import { DbconfigService } from './dbconfig.service';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Dbconfig } from './dbconfig';
import { MdDialog, MdDialogConfig, MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-deconfig',
  templateUrl: './deconfig.component.html',
  styleUrls: ['./deconfig.component.css']
})
export class DeconfigComponent implements OnInit {

  data: Dbconfig = {}
  search = new Subject<string>();
  constructor(public ds: DbconfigService, public dialog: MdDialog) {
    this.search.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.s(term)).subscribe(d => {
        console.log(d);
        this.datas = d;
      }, error => console.log(error));
  }
  datas = []
  ngOnInit() {
  }

  s(fs: string) {
    return this.ds.sn(fs)
  }

  save() {
    this.ds.add(this.data).subscribe(d => {
      console.log(d)
      this.data = {}
    }, e => { console.log(e) })
  }
  edit(o) {
    let config = new MdDialogConfig();
    let dr: MdDialogRef<EditdbconfigComponent> = this.dialog.open(EditdbconfigComponent, config);
    dr.componentInstance.db=o
    dr.afterClosed().subscribe(result => {

      if (result) {
        console.log(result)
        this.ds.edit(result).subscribe(d=>{
          console.log(d)
        })
      }
      //this.msg = result;
    }, error => { console.log(error) });
  }
}
