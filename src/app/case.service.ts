import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Case } from './case.model';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private caseList:Case[]=[];
  public removeSubject=new Subject<Case[]>();

  constructor() { 
    this.caseList.push(new Case(0,"","FirstName","LastName",new Date('2020-01-01'),"China","Complete",83681010));
    this.caseList.push(new Case(1,"","FirstName","LastName",new Date('2020-01-01'),"Singapore","Incomplete",83681011));
    this.caseList.push(new Case(2,"","FirstName","LastName",new Date('1982-11-01'),"United State of America","Incomplete",83681012));
    this.caseList.push(new Case(3,"","FirstName","LastName",new Date('2020-01-01'),"United Kingdom","Complete",83681013));
    this.caseList.push(new Case(4,"","FirstName","LastName",new Date('2020-01-01'),"Japan","Incomplete",83681014));
    this.caseList.push(new Case(5,"","FirstName","LastName",new Date('2020-01-01'),"Australia","Incomplete",83681015));
    this.caseList.push(new Case(6,"","FirstName","LastName",new Date('2020-01-01'),"Chile","Complete",83681016));
    this.caseList.push(new Case(7,"","FirstName","LastName",new Date('2020-01-01'),"Country","Incomplete",83681017));
    this.caseList.push(new Case(8,"","FirstName","LastName",new Date('2020-01-01'),"Country","Incomplete",83681018));
    this.caseList.push(new Case(9,"","FirstName","LastName",new Date('2020-01-01'),"Country","Complete",83681019));
    this.caseList.push(new Case(10,"","FirstName","LastName",new Date('2020-01-01'),"Country","Incomplete",83681020));
    this.caseList.push(new Case(11,"","FirstName","LastName",new Date('2020-01-01'),"Country","Incomplete",83681021));
    this.caseList.push(new Case(12,"","FirstName","LastName",new Date('2020-01-01'),"Country","Complete",83681022));
    this.caseList.push(new Case(13,"","FirstName","LastName",new Date('2020-01-01'),"Country","Incomplete",83681023));
    this.caseList.push(new Case(14,"","FirstName","LastName",new Date('2020-01-01'),"Country","Incomplete",83681024));



  }

  updateCase(c:Case){
    var index=this.caseList.findIndex(z=>z.id==c.id);
    this.caseList[index]={...c};
    console.log(this.caseList);
  }

  getCaseList(){
    return this.caseList;
  }

  removeCase(c:Case){
    let removeIndex=this.caseList.findIndex(z=>z.id==c.id);
    this.caseList.splice(removeIndex,1);
    console.log(removeIndex);
    this.removeSubject.next(this.caseList);
  }
}

