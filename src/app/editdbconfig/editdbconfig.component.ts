import { Dbconfig } from '../deconfig/dbconfig';
import { MdDialogRef } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editdbconfig',
  templateUrl: './editdbconfig.component.html',
  styleUrls: ['./editdbconfig.component.css']
})
export class EditdbconfigComponent implements OnInit {

  constructor(public dr: MdDialogRef<EditdbconfigComponent>) { }
  db:Dbconfig={}
  ngOnInit() {
  }

}
