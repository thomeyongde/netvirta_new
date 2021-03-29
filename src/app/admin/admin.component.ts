import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CaseDetailComponent } from '../case-detail/case-detail.component';
import { Case } from '../case.model';
import { CaseService } from '../case.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private caseService:CaseService,public dialog: MatDialog) { }

  
  filterCountry:String="All Countries"
  displayedColumns: string[] = ['selection','img', 'firstName', 'lastName', 'birthDate','country','status','Action'];
  dataSource:MatTableDataSource<Case>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  totalPageCount=0;
  recordPerPage=5;
  pageArr=[];
  currentPage=0;
  selection;
  isfilterCase:boolean=false;
  filterCaseStatus:String='';
  filterCountryList=[];
  filterCountryLetterList=[];
  isfilterCountry:boolean=false;
  @ViewChild(MatSort) sort: MatSort;
  
  filteredCountry=[];
  filteredCase:String='';
  searchValue='';
  selectedCountryLetter='';

  selectable = true;
  removable = true;

  ngOnInit() {
    const initialSelection = [];
    const allowMultiSelect = true;
    let recordSource=this.caseService.getCaseList();
    this.dataSource = new MatTableDataSource<Case>(recordSource);
    this.dataSource.sort = this.sort; //this will solve your problem
    
    this.updatePageCount();

    this.dataSource.paginator = this.paginator;
    this.selection = new SelectionModel<Case>(allowMultiSelect, initialSelection);

    let sub=this.caseService.removeSubject.subscribe(
      (z)=>{
        console.log(z);
        this.dataSource = new MatTableDataSource<Case>(z);
        this.dataSource.sort = this.sort; //this will solve your problem
        this.updatePageCount();

        this.dataSource.paginator = this.paginator;

        this.currentPage=this.paginator.pageIndex;

        //this.goToPage(currentPage+1);

      }
    )
 
  }

  removeCase(row){
    let currentPage=this.paginator.pageIndex;
    console.log(currentPage);
    this.caseService.removeCase(row);

 

  
  }

  editCase(row){

    let dialogRef=this.dialog.open(CaseDetailComponent, {
      width: '500px',
      data:{
         case:row,
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log(result);
        this.caseService.updateCase(result.case);
        this.dataSource.data=this.caseService.getCaseList();
      }
    });
  }

  remove(country){
    this.filteredCountry.splice(country,1);
    this.filteredCountry=[...this.filteredCountry];
    this.startFilter();
  }

  updatePageCount(){
    let recordCount=this.dataSource.filteredData.length||this.dataSource.data.length;

    this.totalPageCount=Math.ceil(recordCount/this.recordPerPage);
    this.currentPage=0;

    this.pageArr=Array.from(new Array(this.totalPageCount), (x,i) => i+1)
  }

  search($event){
    this.startFilter();
  }



  startFilter(){
      this.dataSource.filterPredicate=(data,filter:String)=>{

        if(this.searchValue){
          

          let res=data.birthDate.toDateString()==this.searchValue.toUpperCase() || data.country.toUpperCase().includes(this.searchValue.toUpperCase()) || 
          data.firstName.toUpperCase().includes(this.searchValue.toUpperCase())||
          data.lastName.toUpperCase().includes(this.searchValue.toUpperCase())||data.status.toUpperCase().includes(this.searchValue.toUpperCase());
        
         

          if(!res){
            return;
          }
        }


        return (this.filteredCase==''?true:data.status.toUpperCase()==this.filteredCase.toUpperCase()) && 
        (this.filteredCountry.length>0?
          this.filteredCountry.findIndex(i=>i==data.country)>=0:true);
        
      }

      this.dataSource.filter=" ";
      this.updatePageCount();
  }

  /** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected == numRows;
}

masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}

  onFilterCase($event){
    this.isfilterCase=!this.isfilterCase;
    this.isfilterCountry=false;
  }

  dofilterCountry(country){
    this.filteredCountry.push(country);
    this.filteredCountry=[...this.filteredCountry];
    this.startFilter();
  }

  resetFilter($event){
    //Clear Status filter
    this.isfilterCase=false;
    this.filteredCase='';

    //Clear textbox
    this.searchValue='';

    //Clear Country Filter
    this.filteredCountry=[];
    this.filteredCountry=[...this.filteredCountry];
    this.isfilterCountry=false;
    this.startFilter();

  }
  

  dofilterStatus(val){
    this.filteredCase=val;
    this.startFilter();
  }

  onFilterCountry($event){
    this.isfilterCase=false;
    this.isfilterCountry=!this.isfilterCountry;


    let data=this.dataSource.data;

    this.filterCountryLetterList=Array.from(new Set(data.map(z=>z.country.charAt(0)))).sort();
    //this.filterCountryLetterList=Array.from(Array(26).keys()).map((_, y) => String.fromCharCode(y + 65));
    //console.log();
    //console.log(Array.from(Array(26).keys()));

    //console.log(this.filterCountryLetterList);
  }

  onfilterCountryLetter(country){
    
    let data=this.dataSource.data;
    this.selectedCountryLetter=country;
    this.filterCountryList=Array.from(new Set(data.filter(z=>z.country.startsWith(country)).map(y=>y.country))).sort();
    
    
  }

  goToPage(page){
    console.log(page);
    this.paginator.pageIndex = +(page-1), // number of the page you want to jump.
      this.paginator.page.next({
        pageIndex: +(page-1),
        pageSize: this.paginator.pageSize,
        length: this.paginator.length
      });
    
      this.currentPage=+(page-1);
  }

}
