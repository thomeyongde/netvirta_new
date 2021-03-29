import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Case } from '../case.model';

@Component({
  selector: 'app-case-detail',
  templateUrl: './case-detail.component.html',
  styleUrls: ['./case-detail.component.css']
})
export class CaseDetailComponent implements OnInit {
  
  acase:Case;
  caseForm;
  @ViewChild('caseForm') aform:NgForm;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<CaseDetailComponent>) { }

  ngOnInit() {
    this.acase=this.data.case;
  }

  updateAccount(){
    this.dialogRef.close({case:this.acase});
  }

  cancel(){
    this.dialogRef.close();
  }

  check($event){
    console.log(this.aform.valid);
  }


}
